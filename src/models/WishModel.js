import mongoose from 'mongoose';

const DataSchema= new mongoose.Schema({
	productID:{type:mongoose.Schema.Types.ObjectId,required: true},
	userID:{type:mongoose.Schema.Types.ObjectId,required: true},
},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('wishlists', DataSchema);