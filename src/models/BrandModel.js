import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
		brandName: {type: String,unique:true, required: true},
		brandImg: {type: String,required: true},
},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('brands', DataSchema);