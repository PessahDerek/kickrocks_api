import mongoose, {Schema} from "mongoose";
import {UserModel} from "../../../env.d.types";


const User = new Schema<UserModel>({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: {type: String, required: true, select: false}
})

const Users = mongoose.model('Users', User);
export default Users;


