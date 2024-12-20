export const isValidImageUrl = (url: string): boolean => {
  return /(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg))/i.test(url);
};

