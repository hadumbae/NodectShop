import User from '../../models/User/User.js';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

interface RegisterData {
	name: string;
	email: string;
	password: string;
}

const AuthService = {
	async register(data: RegisterData, isAdmin: boolean = true) {
		const { name, email, password } = data;
		const hashedPassword = await bcrypt.hash(password, 12);

		return await User.create({ name, email, isAdmin, password: hashedPassword });
	},

	async signin(email: string, password: string) {
		const user = await User.findOne({ email: email });
		if (!user) throw createError(404, 'User not found.');

		const isEqual = bcrypt.compare(password, user.password);
		if (!isEqual) throw createError(401, 'Invalid password!');

		return jwt.sign(
			{
				userID: user._id.toString(),
				name: user.name,
				email: email,
				isAdmin: user.isAdmin,
			},
			'somesupersecretsecret',
			{ expiresIn: '6h' }
		);
	},

	async changePassword(email: string, oldPassword: string, newPassword: string) {
		const user = await User.findOne({ email: email });
		if (!user) throw createError(404, 'User not found.');

		const isEqual = bcrypt.compare(oldPassword, user.password);

		if (!isEqual) {
			throw createError(401, 'Unauthorized!');
		}

		user.password = await bcrypt.hash(newPassword, 12);
		user.save();

		return user;
	},
};

export default AuthService;
