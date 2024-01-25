"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
require("dotenv").config();
const redis_1 = require("./redis");
//parse environment variables to integrates with fallback value
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = parseInt(process.env.ACCESS_REFRESH_EXPIRE || '300', 10);
//options for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    //upload session to redis
    redis_1.redis.set(user._id, JSON.stringify(user));
    //parse environment variables to integrates with fallback value
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const refreshTokenExpire = parseInt(process.env.ACCESS_REFRESH_EXPIRE || '300', 10);
    //options for cookies
    const accessTokenOptions = {
        expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
        maxAge: accessTokenExpire * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
    };
    const refreshTokenOptions = {
        expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
        maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    };
    //only set secure to true in production
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
};
exports.sendToken = sendToken;
