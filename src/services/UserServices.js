import UserModel from "../models/UserModel.js";
import sendEmail from "../utility/emailUtility.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import ProfileModel from "../models/ProfileModel.js";

export const LoginServices= async (req)=>{

	try {
		let email= req.params.email;
		let code=Math.floor(100000+Math.random()*900000);
		let EmailTo = email;
		let EmailText=` Your Verification Otp Code  is ${code}` ;
		let EmailSubject='OTP Verification';
		await sendEmail(EmailTo,EmailText,EmailSubject)

		await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert: true});

		return {status:"success", message:"6 Digit OTP has been send"}

	} catch (error) {
		return {status:"fail", message:"failed "}
	}


}

export const OtpVerificationServices= async (req)=>{

	try {
		let email= req.params.email;
		let otp= req.params.otp;

		let user=await UserModel.find({email:email,otp:otp});
		if(user.length===1){
			let token=TokenEncode(email,user[0]['_id']);
			await UserModel.updateOne({email:email},{$set:{otp:"0"}})
			return {status:"success", message:"Valid OTP ", "token":token};
		}else{
			return {status:"fail", message:"Invalid OTP"};
		}
	}catch (error) {
		return {status:"fail", message: error.toString()};
	}


}

export const SaveProfileServices= async (req)=>{

	try {
		let user_id=req.headers.user_id;
		let reqBody=req.body;
		reqBody.userID=user_id;
		await ProfileModel.updateOne({userID:user_id},{$set:reqBody}, {upsert: true});
		return {status:"success", message:"Save profile successfully"};

	}catch (error) {
		return {status:"fail", message: error.toString()};
	}


}

export const GetProfileServices= async (req)=>{
	try {
		let user_id=req.headers.user_id;
		let data= await ProfileModel.find({userID:user_id});
		return {status:"success", "data": data};
	}catch (error) {
		return {status:"fail", message: error.toString()};
	}


}