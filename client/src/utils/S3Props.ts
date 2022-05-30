const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
const REGION = "us-west-1";
export const S3_BUCKET = "nss-integration";

const S3Props = {
  params: { Bucket: S3_BUCKET },
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};
export default S3Props;
