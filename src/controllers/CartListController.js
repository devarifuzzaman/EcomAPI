import { CartListService, SaveCartListService ,  UpdateCartListService, RemoveCartListService} from "../services/CartListServices.js";

export const CartList= async (req, res)=>{
	let result= await CartListService(req);
	res.status(200).json(result);
}


export const SaveCartList= async (req, res)=>{
	let result= await SaveCartListService(req);
	res.status(200).json(result);
}

export const  UpdateCartList= async (req, res)=>{
	let result= await  UpdateCartListService(req);
	res.status(200).json(result);
}
export const  RemoveCartList= async (req, res)=>{
	let result= await  RemoveCartListService(req);
	res.status(200).json(result);
}
