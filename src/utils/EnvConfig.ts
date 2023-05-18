import * as fs from "fs";
import * as path from "path";

interface EnvConfig {
  [key: string]: string;
}

class Config {
  private static instance: Config;
  private readonly envConfig: EnvConfig;

  private constructor(filePath: string) {
    this.envConfig = this.parseEnvFile(filePath);
  }

  public static getInstance(filePath: string = ".env"): Config {
    if (!Config.instance) {
      Config.instance = new Config(filePath);
    }
    return Config.instance;
  }

  private parseEnvFile(filePath: string): EnvConfig {
    const envContent = fs.readFileSync(path.resolve(filePath), "utf-8");
    const envConfig: EnvConfig = {};

    for (const line of envContent.split("\n")) {
      const [key, value] = line.split("=");
      if (key) {
        envConfig[key.trim()] = value.trim();
      }
    }

    return envConfig;
  }

  public get(key: string): string | undefined {
    return this.envConfig[key];
  }

  public getOrThrow(key: string): string {
    const value = this.envConfig[key];
    if (value) {
      return value;
    }
    throw new Error(`Missing required environment variable '${key}'.`);
  }

  // Define any other methods or properties you need here
}

const envConfig = Config.getInstance();
export default envConfig;
