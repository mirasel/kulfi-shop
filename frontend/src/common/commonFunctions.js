export function emailCheck(value) {
  return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null;
}

export function passwordCheck(value) {
  return value.trim().length <= 7;
}

export function isEmpty(value) {
  return value.trim().length === 0;
}

const CryptoJS = require("crypto-js");

export const encryptWithAES = (text) => {
  const passphrase = "11281";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext) => {
  const passphrase = "11281";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const lsetItem = (key, value, encrypt = false) => {
  encrypt
    ? window.localStorage.setItem(key, encryptWithAES(value))
    : window.localStorage.setItem(key, value);
};

export const lgetItem = (key, decrypt = false) => {
  const item = localStorage.getItem(key);
  return decrypt ? decryptWithAES(item === null ? "null" : item) : item;
};

export const lremoveItem = (keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const saveCommonData = (data) => {
  lsetItem("il", "1");
  lsetItem("at", data.access_token, true);
  lsetItem("ia", data.user.isAdmin ? "yes" : "no", true);
  lsetItem("iv", data.user.email_verified_at !== null ? "yes" : "no", true);
  lsetItem("id", data.user.id.toString());
  lsetItem("name", data.user.name);
};
