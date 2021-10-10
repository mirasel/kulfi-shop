const BACKEND_URL = "http://localhost:8000";

export async function login(userData) {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function logout(token) {
  const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  return data;
}

export async function register(userData) {
  const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function resendVerificationLink(token) {
  const response = await fetch(`${BACKEND_URL}/api/auth/email/resend`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getAllUsers() {
  const response = await fetch(`${BACKEND_URL}/users`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  console.log(data);

  const transformedUsers = [];

  for (const key in data) {
    const userObj = {
      id: key,
      ...data[key],
    };

    transformedUsers.push(userObj);
  }

  return transformedUsers;
}

export async function getAllPosts() {
  const response = await fetch(`${BACKEND_URL}/posts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }

  const transformedPosts = [];

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    };

    transformedPosts.push(postObj);
  }

  return transformedPosts;
}

export async function getSinglePost(postId) {
  console.log("getsinpost->", postId);
  const response = await fetch(`${BACKEND_URL}/posts/${postId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch post.");
  }

  const loadedPost = {
    id: postId,
    ...data,
  };

  return loadedPost;
}

export async function addPost(postData) {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create post.");
  }

  return null;
}

export async function editPost(postData) {
  const response = await fetch(`${BACKEND_URL}/posts/${postData.id}`, {
    method: "PUT",
    body: JSON.stringify({
      userId: postData.userId,
      title: postData.title,
      body: postData.body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit post.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${BACKEND_URL}/comments`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(postId) {
  const response = await fetch(`${BACKEND_URL}/comments/?postId=${postId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
