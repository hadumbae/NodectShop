import UserRepository from "../../repositories/UserRepository.js";
import User from "../../models/User/User.js";
import createError from "http-errors";

export default {
    async updateBasicUserDetails(userID: string, data){
        if (data.isAdmin) throw createError(401, "Admin Status Cannot Be Updated.");

        const updateData = {
            name: data.name,
            dob: data.dob,
            gender: data.gender,
        }

        return await UserRepository.findByIdAndUpdate(userID, updateData);
    },

    async updatePassword(userID: string, data){
      // TODO
      // data: {oldPassword, newPassword}
      // Authenticate oldPassword
      // Update To New Password
    },

    async updateEmail(userID: string, data){
      // TODO
    }
}