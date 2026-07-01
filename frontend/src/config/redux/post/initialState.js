export const initialState = {
  // Feed
  posts: [],           // array of post objects (populated with user info)
  feedLoading: false,
  feedError: null,

  // Create post
  createLoading: false,
  createError: null,

  // Like / Unlike
  likeLoading: {},     // { [postId]: true|false }
  likeError: null,

  // Comments per post
  comments: {},        // { [postId]: Comment[] }
  commentsLoading: {}, // { [postId]: true|false }
  commentsError: null,

  // Add comment
  addCommentLoading: false,
  addCommentError: null,

  // Delete comment
  deleteCommentLoading: {},  // { [commentId]: true|false }
  deleteCommentError: null,

  // Delete post
  deletePostLoading: {},     // { [postId]: true|false }
  deletePostError: null,
};
