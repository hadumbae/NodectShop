// The Base Repository.
//
// I did have a think about whether I should even write this class, or
// just remove all the repositories and just use the Mongoose models
// insted. Yes, the repository pattern allows you to more easily swap
// database systems, but realistically, how often do projects have to
// take such a radical step? Especially if we're talking about large
// and/or complex projects?
//
// Yet however, without repositories, my services seem to unnecessarily
// become bloated with pure database logic. So as it is, I reckon the
// actual value of the repository pattern is the seperation of concerns
// where the repository layer contain most of the database code, so that
// the service layer can more effectively handle business logic. Yeah,
// this seems pretty obvious and clear cut now, but doing and failing
// is much more rewarding than just reading something off the internet.

import {Model, Types} from "mongoose";
import createError from "http-errors";

export default class BaseRepository {
    model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async count(conditions = {}) {
        return this.model.countDocuments(conditions);
    }

    async paginated(currentPage: any = 1, perPage: any = 15, conditions = {}, sort = {}) {
        return this.model.find(conditions)
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
    }

    async paginatedLean(currentPage: any = 1, perPage: any = 15, conditions = {}, sort = {}) {
        return this.model.find(conditions)
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .lean();
    }

    async find(conditions = {}) {
        return this.model.find(conditions);
    }

    async findLean(conditions = {}) {
        return this.model.find(conditions).lean();
    }

    async findOne(conditions = {}) {
        return this.model.findOne(conditions);
    }

    async findOneLean(conditions = {}) {
        return this.model.findOne(conditions).lean();
    }

    async findById(_id: Types.ObjectId | string) {
        return this.model.findById(_id);
    }

    async findByIdLean(_id: Types.ObjectId | string) {
        return this.model.findById(_id).lean();
    }

    async existsOr404(_id: Types.ObjectId | string) {
        const res = await this.model.findById(_id);
        if (!res) throw createError(404, "404. Not found.");
        return res;
    }

    async existsOr404Lean(_id: Types.ObjectId | string) {
        if (!Types.ObjectId.isValid(_id)) throw createError(404, "404. Invalid ID.");

        const res = await this.model.findById(_id);
        if (!res) throw createError(404, "404. Not found.");
        return res;
    }

    async create(data: any) {
        return this.model.create(data);
    }

    async save(data: any) {
        const entity = new this.model(data);
        await entity.save();
        return entity;
    }

    async findByIdAndUpdate(_id: Types.ObjectId | string, data: any) {
        const entity = await this.existsOr404(_id);
        await entity.updateOne(data);
        return entity;
    }

    async findByIdAndDelete(_id: Types.ObjectId | string) {
        const entity = await this.existsOr404(_id);
        await entity.deleteOne();
    }
}