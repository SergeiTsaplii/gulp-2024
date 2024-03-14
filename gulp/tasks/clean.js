import { deleteAsync } from 'del';
import filePaths from '../config/paths.js';

const clean = () => deleteAsync(filePaths.buildFolder);

export default clean;
