import * as fs from 'fs';
export const DEBUG = true;
export const ROOT_DIR = './';
const DATABASE_FOLDER_PATH = ROOT_DIR + 'database/';
const IMAGES_FOLDER_PATH = DATABASE_FOLDER_PATH + 'images/';
export const PIZZA_IMAGES_FOLDER_PATH = IMAGES_FOLDER_PATH + 'pizza-images/';
export const DATABASE_PATH = DATABASE_FOLDER_PATH + 'db.sqlite';

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
  if (DEBUG) {
    deleteSafely(DATABASE_PATH);
  }
}
