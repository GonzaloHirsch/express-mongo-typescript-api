// Add dotenv for environment variables
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000,
    prefix: process.env.API_PREFIX || 'api',
    databaseUri: process.env.MONGODB_URI
};

export default config;
