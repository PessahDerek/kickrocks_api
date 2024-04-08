import mongoose from "mongoose";
import DateToString = module
import express, {NextFunction} from "express";

declare interface ProductModel {
    _id: string | mongoose.Types.ObjectId;
    images: string[];
    make: string;
    name: string;
    price: number;
    discount?: number;
    description: string;
    type?: "unisex" | "men" | "ladies" | "kids" | "official";
}

declare interface UserModel {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

declare interface OrderModel {
    _id: string | mongoose.Types.ObjectId;
    product: ProductModel;
    count: number;
    date: DateToString;
    completed: boolean;
    cost: number;
}

declare interface RequestExt extends express.Request {
    user?: {
        id: string;
        role: "user" | "admin"
    }
}

declare interface LoginDetails {
    identifier: string;
    password: string;
}
declare interface UserProfile {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}
declare interface SignupDetails extends UserProfile, LoginDetails{
    identifier: undefined;
    confirmPassword: string;
}
declare interface AuthResponse {
    profile: UserProfile;
    token: string;
}

declare type ReqHandler= (req: RequestExt, res: express.Response, next: NextFunction) => void;

export {ProductModel, UserModel, OrderModel, ReqHandler, LoginDetails, SignupDetails, AuthResponse, UserProfile }


