import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const notificationRoute=express.Router();
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { updateAccessTOken } from "../controllers/user_controller";

notificationRoute.get(
    "/get-all-notifications", 
    isAuthenticated, 
    authorizeRoles("admin"),
    getNotifications);

notificationRoute.put(
    "/update-notifications/:id", 
    isAuthenticated, 
    authorizeRoles("admin"),
    updateNotification);

export default notificationRoute;