import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ override: true });

const envFilePath = path.resolve(__dirname, '.env');

// Function to update the .env file
function updateEnv(newEnv) {

    let envFileContents = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf8') : '';
    const existingEnv = dotenv.parse(envFileContents);
    const updatedEnv = { ...existingEnv, ...newEnv };

    const updatedEnvContents = Object.entries(updatedEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync(envFilePath, updatedEnvContents, 'utf8');
    Object.assign(process.env, newEnv);
}

// Function to request a new token
export async function requestNewToken() {
    const response = await axios.post('https://oauth.battle.net/token', null, {
        auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET,
        },
        params: {
            grant_type: 'client_credentials',
        }
    });

    const newTokenData = {
        BLIZZARD_API_TOKEN: response.data.access_token,
        EXPIRES_IN: response.data.expires_in,
        TIMESTAMP: Date.now().toString()
    };

    updateEnv(newTokenData);
    return newTokenData.BLIZZARD_API_TOKEN;
}

// Function to check if the current token is valid
function isTokenValid() {
    const currentTime = Date.now();
    const tokenExpirationTime = parseInt(process.env.TIMESTAMP, 10) + (parseInt(process.env.EXPIRES_IN, 10) * 1000);
    return currentTime < tokenExpirationTime;
}

// Function to get the current token
export async function getToken() {
    // Check if the current token is valid
    if (isTokenValid()) {
        return process.env.BLIZZARD_API_TOKEN;
    }

    return await requestNewToken();
}
