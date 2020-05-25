const dev = {
  STRIPE_KEY: "pk_test_hrarE21RbnbDplEXZCL50R1D00Q8gH1THp",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-lyk1x825wixo",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://7hr9pbt8fe.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_RMMXQ5FGZ",
    APP_CLIENT_ID: "6a4puj09euv9ussf5n60enrhfn",
    IDENTITY_POOL_ID: "us-east-1:6a5b944b-6935-472d-858a-897526812334",
  },
  social: {
    FB: "890744491404581",
  },
};

const prod = {
  STRIPE_KEY: "pk_test_hrarE21RbnbDplEXZCL50R1D00Q8gH1THp",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1xahb8m13lk2y",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://7x86cwslui.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_hF0Uy3ylP",
    APP_CLIENT_ID: "793gjk1rh98fikr0qtgm5v5o9b",
    IDENTITY_POOL_ID: "us-east-1:cc6636a9-ab39-41d4-ba5a-7ddb950a783b",
  },
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
