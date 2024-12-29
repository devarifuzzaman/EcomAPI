import mongoose from 'mongoose';

const DataSchema= new mongoose.Schema({
		userID: {type:mongoose.Schema.Types.ObjectId,required: true},
		productID: {type:mongoose.Schema.Types.ObjectId,required: true},
		invoiceID: {type:mongoose.Schema.Types.ObjectId,required: true},
		qty: {type:String,required: true},
		price: {type:String,required: true},
		color: {type:String,required: true},
		size: {type:String,required: true}

	},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('invoiceProducts', DataSchema);