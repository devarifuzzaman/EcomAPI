import {CreateWishlistService, RemoveWishlistService, WishlistService} from "../services/WishListServices.js";

export const CreateWishlist= async (req, res)=>{
	let result= await CreateWishlistService(req);
	res.status(200).json(result);
}


export const RemoveWishlist= async (req, res)=>{
	let result= await RemoveWishlistService(req);
	res.status(200).json(result);
}

export const Wishlist= async (req, res)=>{
	let result= await WishlistService(req);
	res.status(200).json(result);
}
