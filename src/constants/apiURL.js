const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://codeshare-api-vxvdcx3l4q-uw.a.run.app/"
    : "localhost:5000";

export default apiURL;
