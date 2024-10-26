import Product from '../models/Product/Product.js';

export const find = (conditions = {}) => Product.find(conditions);

export const findById = () => Product.find({});

export const updateByID = (id, data) => Product.findByIdAndUpdate(id, data);

export const deleteByID = (id) => Product.findByIdAndDelete(id);
