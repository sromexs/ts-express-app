import envConfig from "../utils/EnvConfig";

class ConfigClass {
  dbConfig = envConfig.get("DB_CONFIG");
  port = Number(envConfig.get("PORT") || 3000);
  allowedOrigins = [envConfig.get("ORIGIN") || `http://127.0.0.1:${this.port}`];
}

const Config = new ConfigClass();
export default Config;
