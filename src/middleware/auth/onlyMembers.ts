import {ReqHandler} from "../../../env.d.types";
import {respond} from "../../utils/functions";
import jwt from 'jsonwebtoken';


export const onlyMembers: ReqHandler = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token) return respond(res, 304, "You need to login to continue this operation!");
        jwt.verify(token, process.env?.SERVER_KEY??"1234", (error, decoded)=>{
            if(error || (typeof decoded === 'string' || !decoded)) return respond(res, 304, "Your session has expired, please login and try again!")
            const user = {id: decoded.id, role: decoded.role}
            req.user ? req.user = user : Object.assign(req, {user: user})
            next()
        } )
    }catch (err){
        console.log(`Error: (onlyLogin.ts) ${req.url} \n-> ${err}`)
        respond(res, 500, 'Sorry, something went wrong, please try again!')
    }
}