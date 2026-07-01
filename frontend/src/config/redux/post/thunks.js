import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../index";

// ─────────────────────────────────────────────
// Fetch all posts (feed)
// ─────────────────────────────────────────────
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_POSTS);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch posts");
      }
      return data.posts; // array of post objects
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Create a new post  (supports optional media)
// payload: { userId, body, mediaFile? }
// ─────────────────────────────────────────────
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ userId, body, mediaFile }, { rejectWithValue }) => {
    try {
      let response;

      if (mediaFile) {
        // multipart/form-data for media upload
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("body", body);
        formData.append("media", mediaFile);

        response = await fetch(API_ENDPOINTS.CREATE_POST, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(API_ENDPOINTS.CREATE_POST, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, body }),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create post");
      }
      return data.post; // newly created post object
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Like / Unlike a post
// payload: { postId, action: "like" | "unlike" }
// ─────────────────────────────────────────────
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, action = "like" }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.LIKE_POST(postId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update like");
      }
      return { postId, likes: data.likes, action }; // { postId, likes: number, action }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Fetch comments for a post
// payload: postId
// ─────────────────────────────────────────────
export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_COMMENTS(postId));
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch comments");
      }
      return { postId, comments: data.comments };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Add a comment to a post
// payload: { userId, postId, body }
// ─────────────────────────────────────────────
export const addComment = createAsyncThunk(
  "post/addComment",
  async ({ userId, postId, body }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_COMMENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, postId, body }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add comment");
      }
      return { postId, comment: data.comment };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Delete a comment
// payload: { commentId, postId, userId }
// ─────────────────────────────────────────────
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({ commentId, postId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_COMMENT(commentId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete comment");
      }
      return { commentId, postId };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Delete a post (soft-delete: active → false)
// payload: postId
// ─────────────────────────────────────────────
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_POST(postId), {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete post");
      }
      return postId;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);
