export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9080";

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,

  // Profile
  GET_PROFILE: (userId) => `${BASE_URL}/profile/${userId}`,
  UPDATE_PROFILE: `${BASE_URL}/update-profile`,
  UPDATE_PROFILE_PICTURE: `${BASE_URL}/update-profile-picture`,
  UPLOAD_RESUME: `${BASE_URL}/resume`,
  DOWNLOAD_RESUME: (userId) => `${BASE_URL}/resume/${userId}`,
  GENERATE_PDF: (userId) => `${BASE_URL}/pdf/${userId}`,

  // Connections
  SEND_CONNECTION: `${BASE_URL}/send`,
  ACCEPT_CONNECTION: (requestId) => `${BASE_URL}/accept/${requestId}`,
  REJECT_CONNECTION: (requestId) => `${BASE_URL}/reject/${requestId}`,
  GET_PENDING: (userId) => `${BASE_URL}/pending/${userId}`,
  GET_MY_CONNECTIONS: (userId) => `${BASE_URL}/my-connections/${userId}`,

  // Posts
  CREATE_POST: `${BASE_URL}/posts/create`,
  GET_POSTS: `${BASE_URL}/posts`,
  LIKE_POST: (postId) => `${BASE_URL}/posts/like/${postId}`,
  ADD_COMMENT: `${BASE_URL}/posts/comment`,
  GET_COMMENTS: (postId) => `${BASE_URL}/posts/comments/${postId}`,
  DELETE_COMMENT: (commentId) => `${BASE_URL}/posts/comments/${commentId}`,
  DELETE_POST: (postId) => `${BASE_URL}/posts/${postId}`,
};
