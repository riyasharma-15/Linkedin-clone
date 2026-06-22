import { Router } from "express";
import { register, login, updateProfilePicture, getUserProfile, updateUserProfile, uploadResume, downloadResume, generateUserPdf, sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, getPendingRequests, getMyConnections } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";
const router = Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update-profile-picture').post(upload.single('profile_pic'), updateProfilePicture);
router.route('/profile/:userId').get(getUserProfile);
router.route('/update-profile').post(updateUserProfile);

router.route('/resume')
    .post(upload.single('resume'), uploadResume);

router.route('/resume/:userId')
    .get(downloadResume);
router.route('/pdf/:userId').get(generateUserPdf);
router.route("/send").post(sendConnectionRequest);
router.route("/accept/:requestId").post(acceptConnectionRequest);
router.route("/reject/:requestId").post(rejectConnectionRequest);
router.route("/pending/:userId").get(getPendingRequests);
router.route("/my-connections/:userId").get(getMyConnections);
export default router;