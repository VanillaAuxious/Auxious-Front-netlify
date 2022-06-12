let GITHUB_CLIENT_ID = null;

if (process.env.ENV === DEV) {
  GITHUB_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_LOCAL;
}

if (process.env.ENV === TEST) {
  GITHUB_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_TEST;
}

if (process.env.ENV === PROD) {
  GITHUB_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID_PROD;
}

export default GITHUB_CLIENT_ID;
