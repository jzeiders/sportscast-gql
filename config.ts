const config = {
  db: {
    db: "postgres",
    username: "postgres",
    password: "8ds09f8dojfe",
    host: "35.227.165.50"
  },
  redis: {
    host: "redis-12332.c1.us-central1-2.gce.cloud.redislabs.com",
    port: "12332",
    retry_strategy: options => {
      return Math.max(options.attempt * 100, 3000);
    }
  }
};
export default config;
