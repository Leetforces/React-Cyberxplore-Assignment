import axios from "axios";

export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

export const resetPassword = async (email) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/resetPassword`, { email });
  return res;
}

export const changePassword = async (password, token) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/updatePassword`, {
    password,
    token,
  });
  return res;
}
export const updatePassword2 = async (token,password, newPassword) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/updatePassword2`, {
    password,
    newPassword,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
export const updateallDetails= async (token,firstName,lastName,email,DOB,gender,picUrl) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/updateallDetails`,{firstName,lastName,email,DOB,gender,picUrl}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}



export const validEmail = (email) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return (true);
  }
  return (false)
}

export const uploadImage = async (data) => {
  const res = await axios.post('https://api.cloudinary.com/v1_1/jadavpur-university/image/upload', data);
  return res;
}

//udate user in local storage
export const updateUserInLocalStorage = (user) => {
  if (window.localStorage.getItem('auth')) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth))
  }
}