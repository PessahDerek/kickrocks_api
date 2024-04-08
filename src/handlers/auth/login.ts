import {AuthResponse, LoginDetails, ReqHandler} from "../../../env.d.types";
import {hashPassword, makeToken, respond} from "../../utils/functions";
import Users from "../../database/models/Users";


export const login: ReqHandler = async (req, res, next) => {
    const { identifier, password } = req.body as LoginDetails;
    if(!identifier || !password) return respond(res, 400, 'All fields are required!');
    // find the user
    const found = await Users.findOne({$and: [
            {$or: [{phone: identifier}, {email: identifier}, {firstName: identifier}, {lastName: identifier}]},
            {password: hashPassword(password)}
        ]})
    if(!found) return respond(res, 304, "Wrong password or username!")
    // generate token
    const token = makeToken(found._id);
    respond(res, 200, `Welcome back ${found.firstName}`, {profile: found.toJSON(), token: token} as AuthResponse)
}

