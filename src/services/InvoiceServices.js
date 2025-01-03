import mongoose from 'mongoose';
import FormData from 'form-data';
import axios from 'axios';
import CartModel from "../models/CartModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import ProfileModel from "../models/ProfileModel.js";
import InvoiceProductModel from "../models/InvoiceProductModel.js";
import PaymentSettingModel from "../models/PaymentSettingModel.js";


const ObjectID = mongoose.Types.ObjectId;

export const CreateInvoiceService = async (req, res) => {
	try {
		let user_id = new ObjectID(req.headers.user_id);
		let cus_email = req.headers.email;

		let matchStage = {$match: {userID: user_id}}

		let JoinStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}}
		let unwindStage = {$unwind: '$product'}

		let CartProducts = await CartModel.aggregate([
			matchStage, JoinStage, unwindStage
		])

		let totalAmount = 0;
		CartProducts.forEach((element) => {
			let price;
			if (element['product']['discount']) {
				price = parseFloat(element['product']['discountPrice'])
			} else {
				price = parseFloat(element['product']['price'])
			}
			 totalAmount += parseFloat(element['qty'])*price;
		})

		let vat = totalAmount * 0.05; // 5% vat
		let PayableAmount = totalAmount + vat;


		//Customer Shipping details
		let Profile=await ProfileModel.aggregate([matchStage]);
		let cus_details=`Name:${Profile[0]['cus_name']}, Email:${cus_email}, Address:${Profile[0]['cus_add']}, Phone:${Profile[0]['cus_phone']}`;
		let ship_details=`Name:${Profile[0]['ship_name']}, City:${Profile[0]['ship_city']}, Address:${Profile[0]['ship_add']}, Phone:${Profile[0]['ship_phone']}`;

		// Transaction ID Create
		 let trans_id = Math.floor(10000000 + Math.random() * 90000000);
		 let val_id = 0;
		 let delivery_status = "pending";
		 let payment_status = "pending";

		 // create Invoice

		let createInvoice = await InvoiceModel.create({
			userID: user_id,
			payable: PayableAmount,
			cus_details: cus_details,
			ship_details:ship_details,
			tran_id: trans_id,
			val_id: val_id,
			delivery_status: delivery_status,
			payment_status: payment_status,
			total: totalAmount,
			vat: vat
		});


		// Create Product Invoice

		let invoiceId=createInvoice['_id'];

		CartProducts.forEach(async (element) => {
			await InvoiceProductModel.create({
				userID:user_id,
				productID:element['productID'],
				invoiceID:invoiceId,
				qty:element['qty'],
				price:element['product']['discount']?element['product']['discountPrice']:element['product']['price'],
				color:element['color'],
				size:element['size']
			});
		});

		// Remove Products From Cart
		await CartModel.deleteMany({userID:user_id});

		// SSLCOMMERZ Implement
		let PaymentSettings=await PaymentSettingModel.find();

		const form=new FormData();
		form.append('store_id',PaymentSettings[0]['store_id'])
		form.append('store_passwd',PaymentSettings[0]['store_passwd'])
		form.append('total_amount', PayableAmount.toString())
		form.append('currency',PaymentSettings[0]['currency'])
		form.append('tran_id',trans_id)

		form.append('success_url',`${PaymentSettings[0]['success_url']}/${trans_id}`)
		form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${trans_id}`)
		form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${trans_id}`)
		form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${trans_id}`)

		form.append('cus_name',Profile[0]['cus_name'])
		form.append('cus_email',cus_email)
		form.append('cus_add1',Profile[0]['cus_add'])
		form.append('cus_add2',Profile[0]['cus_add'])
		form.append('cus_city',Profile[0]['cus_city'])
		form.append('cus_state',Profile[0]['cus_state'])
		form.append('cus_postcode',Profile[0]['cus_postcode'])
		form.append('cus_country',Profile[0]['cus_country'])
		form.append('cus_phone',Profile[0]['cus_phone'])
		form.append('cus_fax',Profile[0]['cus_phone'])

		form.append('shipping_method',"YES")
		form.append('ship_name',Profile[0]['ship_name'])
		form.append('ship_add1',Profile[0]['ship_add'])
		form.append('ship_add2',Profile[0]['ship_add'])
		form.append('ship_city',Profile[0]['ship_city'])
		form.append('ship_state',Profile[0]['ship_state'])
		form.append('ship_country',Profile[0]['ship_country'])
		form.append('ship_postcode',Profile[0]['ship_postcode'])

		form.append('product_name','According Invoice')
		form.append('product_category','According Invoice')
		form.append('product_profile','According Invoice')
		form.append('product_amount','According Invoice')

		let SSLRes = await axios.post(PaymentSettings[0]['init_url'], form)

		return {status: "success", data: SSLRes.data}

	}catch (err) {
		return {status: "fail", data: err.toString()}
	}


}


export const PaymentSuccessService = async (req, res) => {
	try{
		let trxID =req.params.trxID;
		await InvoiceModel.updateOne({tran_id: trxID}, {payment_status: "success"});
		return {status:"Success"}
	}catch (err) {
		return {status: "fail", data: err.toString()}
	}
}

export const PaymentCancelService = async (req, res) => {
	try{
		let trxID =req.params.trxID;
		await InvoiceModel.updateOne({tran_id: trxID}, {payment_status: "cancel"});
		return {status:"cancel"}
	}catch (err) {
		return {status: "fail", data: err.toString()}
	}
}

export const PaymentFailService = async (req, res) => {
	try{
		let trxID =req.params.trxID;
		await InvoiceModel.updateOne({tran_id: trxID}, {payment_status: "fail"});
		return {status:"Fail"}
	}catch (err) {
		return {status: "fail", data: err.toString()}
	}
}

export const PaymentIPNService = async (req, res) => {
	try{
		let trxID =req.params.trxID;
		let status = req.body['status'];
		let data = await InvoiceModel.updateOne({tran_id: trxID}, {payment_status: status});
		return {status:"Success", data:data}
	}catch (err) {
		return {status: "fail", data: err.toString()}
	}
}



export const InvoiceListService = async (req, res) => {
	try{
		let user_id=req.headers.user_id;
		let invoice=await InvoiceModel.find({userID:user_id});
		return {status:"success",data: invoice}
	}catch (err) {
		return {status: "fail", data: err.toString()}
	}

}

export const InvoiceProductListService = async (req, res) => {
	try{

		let user_id=new ObjectID(req.headers.user_id);
		let invoice_id=new ObjectID(req.params.invoice_id);

		let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
		let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
		let unwindStage={$unwind:"$product"}

		let products=await InvoiceProductModel.aggregate([
			matchStage,
			JoinStageProduct,
			unwindStage
		])

		return {status:"success",data: products}

	}catch (err) {
		return {status: "fail", data: err.toString()}
	}
}