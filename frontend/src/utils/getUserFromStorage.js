export const getUserFormStorage = () => {
  const token = JSON.parse(localStorage.getItem("userInfo") || null);
  return token?.token;
};
