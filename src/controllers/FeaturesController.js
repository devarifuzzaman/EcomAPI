import { FeatureListService} from "../services/FeaturesServices.js";

export const FeatureList= async (req, res)=>{
	let result= await FeatureListService();
	res.status(200).json(result);
}