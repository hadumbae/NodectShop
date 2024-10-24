import mongoose from 'mongoose';

export interface ProductImageType {
	_id?: mongoose.Types.ObjectId;
	secure_url: string;
	public_id: string;
}
