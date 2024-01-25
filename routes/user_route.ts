import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessTOken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from '../controllers/user_controller';
import { isAuthenticated,authorizeRoles } from '../middleware/auth';

const userRouter=express.Router();

userRouter.post('/registration',registrationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.get('/logout',logoutUser);

userRouter.get('/logout',isAuthenticated,logoutUser);

userRouter.get("/refresh",updateAccessTOken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth",socialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar",isAuthenticated, updateProfilePicture);

userRouter.get("/get-users",isAuthenticated, authorizeRoles("admin"),getAllUsers);

userRouter.put("/update-user",isAuthenticated, authorizeRoles("admin"),updateUserRole);

userRouter.delete("/delete-user/:id",isAuthenticated, authorizeRoles("admin"),deleteUser);

export default userRouter;