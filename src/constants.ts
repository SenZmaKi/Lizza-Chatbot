import * as fs from 'fs';
export const DEBUG = true;
export const ROOT_DIR = './';
const DATABASE_FOLDER = ROOT_DIR + 'database/';
export const DATABASE_PATH = DATABASE_FOLDER + 'db.sqlite';
const DB_IS_POPULATED_FILE_PATH = DATABASE_FOLDER + 'db-is-populated';

function deleteSafely(path: string) {
  try {
    fs.unlinkSync(path);
  } catch (error) {}
}

//  To repopulate the db delete the file at DB_IS_POPULATED_FILE_PATH
export function populateDatabase(): boolean {
  if (DEBUG) {
    try {
      fs.statSync(DB_IS_POPULATED_FILE_PATH);
      return false;
    } catch (error) {
      fs.writeFileSync(DB_IS_POPULATED_FILE_PATH, 'Hello Lizza!');
      return true;
    }
  }
}

export function debugSetup() {
  if (DEBUG) {
    deleteSafely(DATABASE_PATH);
  }
}
