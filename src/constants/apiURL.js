const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://codeshare-api-vxvdcx3l4q-uw.a.run.app"
    : "http://localhost:5000";

export default apiURL;
