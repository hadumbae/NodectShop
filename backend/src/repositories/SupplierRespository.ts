import Supplier from '../models/Supplier.js';

export const find = async (conditions = {}) => Supplier.find(conditions);

export const findOne = (conditions = {}) => Supplier.findOne(conditions);

export const findByID = (id) => Supplier.findById(id);
