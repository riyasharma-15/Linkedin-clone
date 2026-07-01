import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  fetchPosts,
  createPost,
  likePost,
  fetchComments,
  addComment,
  deleteComment,
  deletePost,
} from "./thunks";

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Clear any global post errors
    clearPostError: (state) => {
      state.feedError = null;
      state.createError = null;
      state.likeError = null;
      state.commentsError = null;
      state.addCommentError = null;
      state.deleteCommentError = null;
      state.deletePostError = null;
    },

    // Optimistic like toggle before the server responds
    optimisticLike: (state, action) => {
      const { postId, action: likeAction } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.likes = likeAction === "unlike"
          ? Math.max(0, post.likes - 1)
          : post.likes + 1;
      }
    },

    // Reset create state (e.g. after closing create-post modal)
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
    },
  },

  extraReducers: (builder) => {
    // ─────────────────────────────────────────────
    // fetchPosts
    // ─────────────────────────────────────────────
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.feedLoading = true;
        state.feedError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.posts = action.payload;  // replace entire feed
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.feedLoading = false;
        state.feedError = action.payload;
      });

    // ─────────────────────────────────────────────
    // createPost
    // ─────────────────────────────────────────────
    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        // Prepend new post to the top of the feed
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });

    // ─────────────────────────────────────────────
    // likePost
    // ─────────────────────────────────────────────
    builder
      .addCase(likePost.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.likeLoading[postId] = true;
        state.likeError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        state.likeLoading[postId] = false;
        // Sync server-confirmed like count
        const post = state.posts.find((p) => p._id === postId);
        if (post) post.likes = likes;
      })
      .addCase(likePost.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.likeLoading[postId] = false;
        state.likeError = action.payload;
      });

    // ─────────────────────────────────────────────
    // fetchComments
    // ─────────────────────────────────────────────
    builder
      .addCase(fetchComments.pending, (state, action) => {
        const postId = action.meta.arg;
        state.commentsLoading[postId] = true;
        state.commentsError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsLoading[postId] = false;
        state.comments[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.commentsLoading[postId] = false;
        state.commentsError = action.payload;
      });

    // ─────────────────────────────────────────────
    // addComment
    // ─────────────────────────────────────────────
    builder
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentLoading = false;
        const { postId, comment } = action.payload;
        // Append to existing comments list for this post
        if (!state.comments[postId]) {
          state.comments[postId] = [];
        }
        state.comments[postId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.payload;
      });

    // ─────────────────────────────────────────────
    // deleteComment
    // ─────────────────────────────────────────────
    builder
      .addCase(deleteComment.pending, (state, action) => {
        const { commentId } = action.meta.arg;
        state.deleteCommentLoading[commentId] = true;
        state.deleteCommentError = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId, postId } = action.payload;
        state.deleteCommentLoading[commentId] = false;
        if (state.comments[postId]) {
          state.comments[postId] = state.comments[postId].filter(
            (c) => c._id !== commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        const { commentId } = action.meta.arg;
        state.deleteCommentLoading[commentId] = false;
        state.deleteCommentError = action.payload;
      });

    // ─────────────────────────────────────────────
    // deletePost
    // ─────────────────────────────────────────────
    builder
      .addCase(deletePost.pending, (state, action) => {
        const postId = action.meta.arg;
        state.deletePostLoading[postId] = true;
        state.deletePostError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.deletePostLoading[postId] = false;
        // Remove from feed immediately
        state.posts = state.posts.filter((p) => p._id !== postId);
        // Clean up any cached comments for this post
        delete state.comments[postId];
      })
      .addCase(deletePost.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.deletePostLoading[postId] = false;
        state.deletePostError = action.payload;
      });
  },
});

export const { clearPostError, optimisticLike, resetCreateState } = postSlice.actions;
export default postSlice.reducer;

// Re-export all thunks for convenient single-import by consumers
export {
  fetchPosts,
  createPost,
  likePost,
  fetchComments,
  addComment,
  deleteComment,
  deletePost,
};
