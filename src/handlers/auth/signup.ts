import {AuthResponse, ReqHandler, SignupDetails, UserProfile} from "../../../env.d.types";
import {hashPassword, makeToken, respond} from "../../utils/functions";
import Users from "../../database/models/Users";


export const signup: ReqHandler = async (req, res, next) =>{
    const { firstName, lastName, email, phone, password, confirmPassword  } = req.body as SignupDetails;
    const invalid = !firstName || !lastName || !email || !phone || !password || !confirmPassword;
    if(invalid) return respond(res, 400, "All fields required!");
    // check if passwords match
    if(password !== confirmPassword) return respond(res, 400, "Passwords do not match!");
    // hash passwd
    req.body.password = hashPassword(password);
    // ensure no other account
    const found = await Users.findOne({$or: [
            {phone: phone.trim(), email: email.trim()}
        ]})
    if(found) return respond(res, 400, "Sorry, a similar account already exists, try logging in!");

    Users.create(req.body)
        .then(user => {
            const {password, _id, ...profile} = user.toJSON();
            // generate token
            const token = makeToken(user._id)
            respond(res, 200, "Welcome to Sneaker Link", {profile: profile, token: token} as AuthResponse)
        })
        .catch(err => {
            console.log("Error: ", err)
            respond(res, 500, "Sorry, something went wrong, please try again!")
        })
}

