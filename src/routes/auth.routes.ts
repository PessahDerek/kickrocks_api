import express from "express";
import {signup} from "../handlers/auth/signup";
import {login} from "../handlers/auth/login";


const authRoutes = express.Router();

authRoutes
    .post('/signup', signup)
    .post('/login', login)

export default authRoutes;
