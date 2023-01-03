export const baseUrl = "https://retechcomm.herokuapp.com/api";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
}