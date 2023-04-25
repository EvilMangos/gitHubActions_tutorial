import dotenv from "dotenv";

const loadEnv = (env: string) => {
  dotenv.config({ path: `./configs/common.env` });
  dotenv.config({ path: `./configs/${env}.env` });
};

loadEnv(process.env["NODE_ENV"] || "development");
