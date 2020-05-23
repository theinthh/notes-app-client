export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "thhabucket",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://rwx10dwfm8.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2XbcaxOhv",
    APP_CLIENT_ID: "hs8vlqbcitss2mk2v7v2cceca",
    IDENTITY_POOL_ID: "us-east-1:fd38654b-30ec-48b4-af5f-e91edfab5cae",
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_hrarE21RbnbDplEXZCL50R1D00Q8gH1THp",
};
