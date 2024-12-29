import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
		image1: {type: String,required: true},
		image2: {type: String,required: true},
		image3: {type: String,required: true},
		image4: {type: String,required: true},
		image5: {type: String},
		image6: {type: String},
		image7: {type: String},
		image8: {type: String},

		des: {type: String, required: true},
		size: {type: String, required: true},
		color: {type: String, required: true},

		productID: {type: mongoose.Schema.Types.ObjectId, required: true},
},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('productDetails', DataSchema);