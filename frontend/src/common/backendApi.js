import axios from "axios";

const BACKEND_URL = "http://localhost:8000/api";
export const IMAGE_URL = "http://localhost:8000/storage";

export async function login(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/login`,
      JSON.stringify(userData),
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function logout(token) {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function register(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/register`,
      JSON.stringify(userData),
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function resendVerificationLink(token) {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/email/resend`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function emailForResetPassword(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/password/email`,
      JSON.stringify(userData),
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function resetPassword(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/password/reset`,
      JSON.stringify(userData),
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

//admin part
export async function addCategory(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/category/create`,
      JSON.stringify(userData.data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function readCategories() {
  try {
    const response = await axios.get(`${BACKEND_URL}/category/read`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getCategory(id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/category/show/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getCategoryToUpdate(id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/category/get/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateCategory(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/category/update/${userData.id}`,
      userData.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteCategory(userData) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/category/delete/${userData.id}`,
      { headers: { Authorization: `Bearer ${userData.token}` } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addKulfi(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/kulfi/create`,
      userData.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getKulfis(userData) {
  try {
    const response = await axios.get(`${BACKEND_URL}/kulfi/read`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getKulfiToUpdate(id) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/kulfi/getKulfiToUpdate/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteKulfi(userData) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/kulfi/delete/${userData.id}`,
      { headers: { Authorization: `Bearer ${userData.token}` } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateKulfi(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/kulfi/update/${userData.id}`,
      userData.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getKulfiDetails(id) {
  try {
    const response = await axios.get(`${BACKEND_URL}/kulfi/show/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addComment(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/comment/create`,
      JSON.stringify(userData.data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteComment(userData) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/comment/delete/${userData.id}`,
      { headers: { Authorization: `Bearer ${userData.token}` } }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addReview(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/review/create`,
      JSON.stringify(userData.data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getReview(userData) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/review/get/${userData.id}`,
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteReview(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/review/delete/`,
      JSON.stringify(userData.data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
