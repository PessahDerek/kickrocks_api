import {ReqHandler} from "../../../env.d.types";
import {onlyMembers} from "./onlyMembers";
import {respond} from "../../utils/functions";


export const onlyAdmin: ReqHandler = async (req, res, next) => {
    onlyMembers(req, res, ()=>{
        if(req.user?.role !== 'admin')  return respond(res, 304, "Unauthorized")
        next()
    })
}

