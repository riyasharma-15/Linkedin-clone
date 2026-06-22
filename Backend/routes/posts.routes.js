import { Router } from "express";
import { 
    activeCheck, 
    createPost, 
    getAllPosts, 
    likePost, 
    addComment, 
    getComments, 
    deletePost,
    deleteComment
} from "../controllers/posts.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.route('/').get(activeCheck);
router.route("/posts/create").post(upload.single("media"), createPost);
router.route("/posts").get(getAllPosts);
router.route("/posts/like/:postId").post(likePost);
router.route("/posts/comment").post(addComment);
router.route("/posts/comments/:postId").get(getComments);
router.route("/posts/comments/:commentId").delete(deleteComment);
router.route("/posts/:postId").delete(deletePost);

export default router;