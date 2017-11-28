import fs from 'fs';
import path from 'path';

export const pathTo = (p = '') => path.join(__dirname, '../', p);
export const slurpFile = p =>
  fs.readFileSync(pathTo(p)).toString().slice(0, -1); // to remove last break line
export const slurpJSON = p => JSON.parse(fs.readFileSync(pathTo(p)));
