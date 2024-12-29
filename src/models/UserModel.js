import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
	email:{type: String, unique: true, required: true,lowercase: true},
	otp: {type: String,required: true}
},
	{
		timestamps: true,
		versionKey: false
	}
)

export default mongoose.model('users', DataSchema);