import Post from "../models/post.model.js";
import Comment from "../models/comments.models.js";
import User from "../models/user.model.js";

export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "RUNNING" });
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { userId, body } = req.body;
        if (!userId || !body) {
            return res.status(400).json({ message: "userId and body are required" });
        }

        // Verify user exists
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            userId,
            body
        });

        if (req.file) {
            newPost.media = req.file.filename;
            newPost.fileType = req.file.mimetype;
        }

        await newPost.save();
        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all active posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ active: true })
            .sort({ createdAt: -1 })
            .populate("userId", "name username ProfilePicture");

        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { action } = req.body; // Optional: "like" or "unlike"

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (action === "unlike") {
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.likes += 1;
        }

        await post.save();
        return res.status(200).json({ message: "Post likes updated", likes: post.likes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        const { userId, postId, body } = req.body;
        if (!userId || !postId || !body) {
            return res.status(400).json({ message: "userId, postId, and body are required" });
        }

        // Check if user exists
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if post exists
        const postExists = await Post.exists({ _id: postId });
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = new Comment({
            userId,
            postId,
            body
        });

        await comment.save();
        return res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all comments for a post
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const postExists = await Post.exists({ _id: postId });
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comments = await Comment.find({ postId })
            .populate("userId", "name username ProfilePicture");

        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a post (set active to false)
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.active = false;
        await post.save();

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required to delete a comment" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Verify that the user deleting the comment is the one who wrote it
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized. You can only delete your own comments." });
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};