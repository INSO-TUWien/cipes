import {exec} from 'child_process';
import {init} from '.';


const prodServer = exec('npm run prod-server');
prodServer.stdout.on('data', data => {
  console.debug('lib', data);
  if (data.includes('Indexing finished'))
    init(prodServer);
});
