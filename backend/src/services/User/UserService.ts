import _ from 'lodash';
import bcrypt from 'bcrypt';
import createError from 'http-errors';

import User from '../../models/User/User.js';

const UserService = {
	/**
	 * Count the number of users with the given parameters in the database.
	 * @param conditions Object
	 * @returns The number of users.
	 */
	async countUsers(conditions = {}) {
		return await User.countDocuments(conditions);
	},

	/**
	 * Find users with the given parameters in the database.
	 * If no parameters are given, all users are returned.
	 * @param conditions - A collection of database queries.
	 * @returns A collection of users.
	 */
	async find(conditions = {}) {
		return await User.find(conditions);
	},

	/**
	 * Finds the first user that matches the given parameters.
	 * @param conditions - A collection of database queries.
	 * @returns The first found user.
	 */
	async findOne(conditions = {}) {
		return await User.findOne(conditions);
	},

	/**
	 * Finds the user by ID or throw a 404 error.
	 * @param id - The ID of the user.
	 * @returns The user with matching ID.
	 */
	async findByID(id) {
		return await User.findById(id);
	},

	/**
	 * Finds the user by ID or throw a 404 error.
	 * @param id - The ID of the user.
	 * @returns The user with matching ID.
	 */
	async findByIDOr404(id) {
		const user = await User.findById(id);
		if (!user) throw createError(404, 'User Not Found. Verify User ID.');
		return user;
	},

	/**
	 * Create a new user.
	 * @param data The required fields for creating a user.
	 * @returns The newly created user.
	 */
	async create(data: any) {
		return await User.create(data);
	},

	/**
	 * Update a user by it's ID.
	 * @param userID The ID of the user.
	 * @param data The fields with which to update the user.
	 */
	async update(userID: string, data: { name: string; email: string }) {
		const oldUser = await User.findById(userID);
		if (!oldUser) throw createError(404, 'User Not Found. Verify User ID.');
		await User.findByIdAndUpdate(userID, data);
	},

	/**
	 * Delete the user.
	 * @param userID The ID of the user.
	 */
	async destroy(userID: string) {
		const user = await User.findById(userID);
		if (!user) throw createError(404, 'User Not Found. Verify User ID.');
		await User.findByIdAndDelete(userID);
	},
};

export default UserService;
