import { heartbeat, register } from './api/piMonitoringService';
import { login } from './api/userService';
import { getConfig } from '@danielhammerl/nodejs-service-framework';
import { database } from './db';

(async function () {
  const token = await login();

  if (!token) {
    console.error('no auth token');
    process.exit(1);
  }

  let id = await database.getData(null, {});
  if (!id) {
    //register
    console.log('register new client');
    const name = getConfig<string>('name');
    const result = await register(token, name);
    if (!result.ok) {
      console.error('register failed');
      process.exit(1);
    }

    id = result.data.id;
    database.saveData(id, { exposeExceptions: true });
  }

  console.log("send heartbeat");
  heartbeat(token, id)
    .then((heartbeatResult) => {
      if(heartbeatResult.ok) {
        console.log("heartbeat ok");
      }
      if (heartbeatResult.status === 404) {
        console.log('id is not registered anymore, delete id');
        // id is not registered anymore, delete id
        database.saveData(null, { exposeExceptions: true });
      }
    })
    .catch((e) => {
      console.error(e);
    });
})();
