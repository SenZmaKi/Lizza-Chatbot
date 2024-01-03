import * as fs from 'fs';
export const DEBUG = true;
export const ROOT_DIR = './';
const DATABASE_FOLDER_PATH = ROOT_DIR + 'database/';
export const DATABASE_PATH = DATABASE_FOLDER_PATH + 'db.sqlite';
export const LOCAL_ENV_FILE_PATH = ROOT_DIR + '.env-local'
export const REFRESH_DATABASE = DEBUG && true;
export const GITHUB_RAW_ENTRYPOINT = "https://raw.githubusercontent.com/SenZmaKi/Lizza-Chatbot/master/"

function deleteSafely(path: string) {
  try {
    fs.unlinkSync(path);
  } catch (error) {}
}

export function databaseFileExists(): boolean {
  try {
    return fs.statSync(DATABASE_FOLDER_PATH).isFile();
  } catch (error) {
    return false;
  }
}

export function debugSetup() {
  if (REFRESH_DATABASE) {
  deleteSafely(DATABASE_PATH);
}}
