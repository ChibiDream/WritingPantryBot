import { Logger } from 'tslog';

export const infoLog = new Logger({ name: "PantryBot", displayFilePath: 'hidden', displayFunctionName: false });

export const warningLog = new Logger({ name: "PantryBot", displayFunctionName: false });