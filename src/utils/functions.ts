import express from "express";
import {compareSync, hashSync} from "bcrypt"
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const respond = (res: express.Response, status: number, message: string, extra?: {}) => {
    res.statusCode = status;
    res.statusMessage = message;
    res.send({...extra??{}}).end()
}

export const hashPassword = (password: string) => {
    return  hashSync(password, 15)
}

export const compareWithHash = (plain: string, hashed: string) => {
    return compareSync(plain, hashed)
}

export const makeToken = (_id: string | mongoose.Types.ObjectId, role: string = 'role') => {
    return jwt.sign({id: _id, role: role}, process.env?.SERVER_SECRET??"1234", {expiresIn: 21600000}) // 6 hours
}

