import ProductModel from "../models/ProductModel.js";
import ProductReviewModel from "../models/ReviewModel.js";
import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductSliderModel from "../models/ProductSliderModel.js";
import mongoose from "mongoose";

const ObjectId=mongoose.Types.ObjectId;



export const BrandListServices=async()=>{
	try {
		const data= await BrandModel.find();
		return {status: "success", data: data}
	} catch (err) {
		return {status: "fail", data: err.toString()}
	}
}

export const CategoryListServices=async()=>{
	try {
		const data= await CategoryModel.find();
		return {status: "success", data: data}
	} catch (err) {
		return {status: "fail", data: err.toString()}
	}
}

export const ProductListServices=async()=>{
	try {
		const data= await ProductModel.find();
		return {status: "success", data: data}
	} catch (err) {
		return {status: "fail", data: err.toString()}
	}
}


export const SliderListServices=async()=>{

	try {
		const data= await ProductSliderModel.find();
		return {status: "success", data: data}
	} catch (err) {
		return {status: "fail", data: err.toString()}
	}

}

export const ListByBrandServices=async(req)=>{

	try {
		let BrandID=new ObjectId(req.params.BrandID);
		let matchStage={$match:{brandID: BrandID}};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};
		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};
		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			joinBrandStage,
			joinCategoryStage,
			unwindBrand,
			unwindCategory,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}





}


export const ListByCategoryServices=async(req)=>{

	try {
		let CategoryID=new ObjectId(req.params.CategoryID);
		let matchStage={$match:{categoryID: CategoryID}};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};
		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};
		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			joinBrandStage,
			joinCategoryStage,
			unwindBrand,
			unwindCategory,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}


}


export const ListByRemarkServices=async(req)=>{
	try {
		let Remark=req.params.Remark;
		let matchStage={$match:{remark: Remark}};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};
		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};
		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			joinBrandStage,
			joinCategoryStage,
			unwindBrand,
			unwindCategory,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}

}


export const ListBySimilarityServices=async(req)=>{
	try {
		let CategoryID=new ObjectId(req.params.CategoryID);
		let matchStage={$match:{categoryID: CategoryID}};
		let limitStage={$limit: 5};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};
		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};
		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			limitStage,
			joinBrandStage,
			joinCategoryStage,
			unwindBrand,
			unwindCategory,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}

}

export const ProductDetailsServices=async(req)=>{

	try {
		let ProductID= new ObjectId(req.params.ProductID);
		let matchStage={$match:{_id: ProductID}};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};
		let joinProductDetailsStage={$lookup:{from:'productDetails', localField:'_id', foreignField:"productID", as : 'details'}};
		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};
		let unwindProductDetails= {$unwind: '$details'};
		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0,'productDetails._id':0,'details._id':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			joinBrandStage,
			joinCategoryStage,
			joinProductDetailsStage,
			unwindBrand,
			unwindCategory,
			unwindProductDetails,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}




}

export const ListByKeywordServices=async(req)=>{

	try {

		let SearchRegex={'$regex':req.params.Keyword, '$options':'i'} ;
		let SearchParams=[{title:SearchRegex},{ shortDes: SearchRegex}];
		let SearchQuery={$or:SearchParams};

		let matchStage={$match:SearchQuery};
		let joinBrandStage={$lookup:{from:'brands', localField:'brandID', foreignField:"_id", as : 'brand'}};
		let joinCategoryStage={$lookup:{from:'categories', localField:'categoryID', foreignField:"_id", as : 'category'}};

		let unwindBrand= {$unwind: '$brand'};
		let unwindCategory= {$unwind: '$category'};

		let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

		let data= await ProductModel.aggregate([
			matchStage,
			joinBrandStage,
			joinCategoryStage,
			unwindBrand,
			unwindCategory,
			projectionStage
		]);

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}


}

export const ProductReviewListServices=async(req)=>{
	try {
		let ProductID= new ObjectId(req.params.ProductID);

		let MatchStage={$match:{productID:ProductID}}

		let JoinWithProfileStage= {$lookup:{from:"customerProfiles",localField:"userID",foreignField:"userID",as:"profile"}};
		let UnwindProfileStage={$unwind:"$profile"}
		let ProjectionStage= {$project: {'des': 1, 'rating': 1, 'profile.customerName': 1}}

		let data= await  ProductReviewModel.aggregate([
			MatchStage,
			JoinWithProfileStage,
			UnwindProfileStage,
			ProjectionStage
		])

		return {status: "success", data: data};
	} catch (err) {
		return {status: "fail", data: err.toString()};
	}

}


export const CreateReviewServices=async(req)=>{
	try{

		let reqBody=req.body;
		reqBody.userID=req.headers.user_id;
		let data=await ProductReviewModel.create(reqBody)
		return {status:"success",data:data}
	}
	catch (e) {
		return {status:"fail",data:e.toString()}
	}
}






export const ListByFilterServices=async(req)=>{

}