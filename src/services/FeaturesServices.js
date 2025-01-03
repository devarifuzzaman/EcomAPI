import FeaturesModel from "../models/FeaturesModel.js";

export const FeatureListService = async (req) => {
	try {
		let data= await FeaturesModel.find({});
		return {status:"success","data":data};
	}
	catch (e) {
		return {status:"fail",message:"Something Went Wrong !"}
	}
}