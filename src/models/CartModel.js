import mongoose from 'mongoose';

const DataSchema= new mongoose.Schema({
		productID:{type:mongoose.Schema.Types.ObjectId,required: true},
		userID:{type:mongoose.Schema.Types.ObjectId,required: true},
		qty:{type:Number,required: true},
		// price:{type:Number,required: true},
		color:{type:String,required: true},
		size:{type:String,required: true},
	},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('carts', DataSchema);