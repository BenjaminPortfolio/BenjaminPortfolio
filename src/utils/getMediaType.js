export const getMediaType = (src) => {
  const ext = src.split(".").pop().toLowerCase();

  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return "image";

  return "unknown";
};
