import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { UPLOAD_DIR, TEMP_UPLOAD_DIR } from './constans/index.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNotExists(UPLOAD_DIR);
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
};

bootstrap();
