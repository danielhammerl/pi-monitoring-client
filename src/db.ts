import { FileDatabase } from '@danielhammerl/nodejs-service-framework';

export const database = new FileDatabase<string | null>({ filePath: './id' });
