import {
	BrandListServices,
	CategoryListServices,
	SliderListServices,
	ListByBrandServices,
	ListByCategoryServices,
	ListByRemarkServices,
	ListBySimilarityServices,
	ProductDetailsServices,
	ListByKeywordServices,
	ProductReviewListServices,
	CreateReviewServices,
	ProductListServices,
	ListByFilterServices
} from "../services/ProductServices.js"

export const ProductBrandList=async(req,res)=>{
	let result= await BrandListServices();
	return res.status(200).json(result);
}

export const ProductCategoryList=async(req,res)=>{
	let result= await CategoryListServices();
	return res.status(200).json(result);
}

export const ProductList=async(req,res)=>{
	let result= await ProductListServices();
	return res.status(200).json(result);
}

export const ProductSliderList=async(req,res)=>{
	let result= await SliderListServices();
	return res.status(200).json(result);
}

export const ProductListByBrand=async(req,res)=>{
	let result= await ListByBrandServices(req);
	return res.status(200).json(result);
}


export const ProductListByCategory=async(req,res)=>{
	let result= await ListByCategoryServices(req);
	return res.status(200).json(result);
}

export const ProductListByRemark=async(req,res)=>{
	let result= await ListByRemarkServices(req);
	return res.status(200).json(result);
}


export const ProductListBySimilar=async(req,res)=>{
	let result= await ListBySimilarityServices(req);
	return res.status(200).json(result);

}

export const ProductDetails=async(req,res)=>{
	let result= await ProductDetailsServices(req);
	return res.status(200).json(result);
}

export const ProductListByKeyword=async(req,res)=>{
	let result= await ListByKeywordServices(req);
	return res.status(200).json(result);
}

export const ProductListByFilter=async(req,res)=>{
	let result= await ListByFilterServices(req);
	return res.status(200).json(result);
}

export const CreateProductReview=async(req,res)=>{
	let result= await CreateReviewServices(req);
	return res.status(200).json(result);
}

export const ProductReviewList=async(req,res)=>{
	let result= await ProductReviewListServices(req);
	return res.status(200).json(result);
}
