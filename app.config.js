import "dotenv/config";

export default {
  expo: {
    ...require("./app.json").expo,
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_KEY: process.env.APP_KEY,
      router: {
        origin: false,
      },
      eas: {
        projectId: "dde1683b-97c7-4a42-9ebb-c6b3e1983478",
      },
    },
  },
};
