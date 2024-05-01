import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';
import { defaultValues } from './default-values';

dotenv.config({ path: path.join(__dirname, '../.env') });

// Define types using Zod
const envVarsSchema = z
  .object({
    PORT: z.coerce.number().default(4000),
    MONGODB_URL: z.string().nonempty().url(), // Ensure valid URL format
    FRONT_END_URL: z.string(),
  })
  .partial();

// Parse environment variables
type EnvVars = z.infer<typeof envVarsSchema>;
const envVarsResult = envVarsSchema.safeParse(process.env);

if (!envVarsResult.success) {
  throw new Error(`Config validation error: ${envVarsResult.error.format()}`);
}
const envVars: EnvVars = envVarsResult.data;

// Construct config object
interface Config {
  port: number;
  mongoose: {
    url: string;
  };
  frontEndUrl: string;
}

const config: Config = {
  port: envVars.PORT || defaultValues.port,
  mongoose: {
    url: envVars.MONGODB_URL || defaultValues.mongoDbUrl,
  },
  frontEndUrl: envVars.FRONT_END_URL || defaultValues.frontEndUrl,
};

export default config;
