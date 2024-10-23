import Category from '../models/Category.js';

export const find = (conditions = {}) => Category.find(conditions);

export const findById = () => Category.find({});

export const updateByID = (id, data) => Category.findByIdAndUpdate(id, data);

export const deleteByID = (id) => Category.findByIdAndDelete(id);
