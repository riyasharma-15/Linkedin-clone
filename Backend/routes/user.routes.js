import {Router} from  "express";
import {register, login, updateProfilePicture, getUserProfile, updateUserProfile, uploadResume, downloadResume} from "../controllers/user.controller.js";
import {upload} from "../middleware/upload.middleware.js";
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

export default router;