import * as fs from 'fs';
import * as path from 'path';

export class DataLoader {
  private static dataPath = path.resolve(__dirname, '../data');

  /**
   * Loads a JSON file from the src/data directory.
   * @param fileName The name of the file without extension (e.g., 'users')
   * @returns The parsed JSON object
   */
  static load(fileName: string): any {
    const filePath = path.join(this.dataPath, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Data file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  /**
   * Writes data to a JSON file in the src/data directory.
   * Useful for saving dynamic data (e.g., created order IDs).
   * @param fileName The name of the file without extension
   * @param data The data to write
   */
  static save(fileName: string, data: any): void {
    const filePath = path.join(this.dataPath, `${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
