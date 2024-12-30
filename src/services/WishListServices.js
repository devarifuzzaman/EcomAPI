import mongoose from "mongoose";
import WishModel from "../models/WishModel.js";
let ObjectId= mongoose.Types.ObjectId;


export const CreateWishlistService= async (req)=>{
	try {
		let userID=req.headers.user_id;
		let productID=req.params.productID;
		await WishModel.updateOne({productID:productID,userID: userID}, {$set:{productID:productID,userID: userID}}, {upsert:true});
		return {status:"success",message:"Product added to wishlist"}
	} catch (error) {
		return {status:"fail",message:  error.toString()}
	}

}

export const RemoveWishlistService= async (req)=>{
	try {
		let wishlistID=req.params.wishlistID;
		let data=await WishModel.deleteOne({_id:wishlistID});
		return {status:"success",message:"Product removed from wishlist"}
	} catch (error) {
		return {status:"fail",message:  error.toString()}
	}

}

export const WishlistService= async (req)=>{
	try {

		let user_id=req.headers.user_id;
		let userID= new ObjectId(user_id)
		let matchStage={$match:{userID}}

		let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
		let unwindProductStage={$unwind:"$product"}

		let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
		let unwindBrandStage={$unwind:"$brand"}

		let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
		let unwindCategoryStage={$unwind:"$category"}



		let projectionStage={
			$project:{
				'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
				'product.categoryID':0,'product.brandID':0,
				'brand._id':0,'category._id':0

			}
		}


		let data=await WishModel.aggregate([
			matchStage,
			JoinStageProduct,
			unwindProductStage,
			JoinStageBrand,
			unwindBrandStage,
			JoinStageCategory,
			unwindCategoryStage,
			projectionStage
		])

		return {status:"success",data:data}

	} catch (err) {
		return {status:"fail",message:  err.toString()}
	}

}

