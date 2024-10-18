const AWS_CONST =
  "https://placeguessr-avatar-bucket.s3.eu-north-1.amazonaws.com";

export const createAvatarUrl = (avatarName = "cartoon-shibu") => {
  return `${AWS_CONST}/${avatarName}`;
};
