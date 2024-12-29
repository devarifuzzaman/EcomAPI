import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
		categoryName: {type: String,unique:true, required: true},
		categoryImg: {type: String,required: true},
},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('categories', DataSchema);