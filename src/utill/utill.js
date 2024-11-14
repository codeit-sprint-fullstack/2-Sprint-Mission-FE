const isValidImageUrl = (url) => {
  return /(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg))/i.test(url);
};
export default {
  isValidImageUrl,
};
