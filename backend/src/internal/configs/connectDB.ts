import mongoose from 'mongoose';

let isConnected = false;
const databaseString = 'mongodb+srv://mongo:nREN5tdPP6aB0B4B@cluster0.ljzrmgx.mongodb.net/nodectshoptest?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
	if (isConnected) {
		console.log('MongoDB Database Connected Already...');
	}

	try {
		const connection = await mongoose.connect(databaseString);

		isConnected = true;
		console.log('MongoDB Database Connected...');

		return connection;
	} catch (error) {
		isConnected = false;

		console.error('MongoDB Database Connection Failed');
		console.error(error);
	}
};

export default connectDB;
