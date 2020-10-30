import {exec} from 'child_process';
import {init} from '.';

const prodServer = exec('npm run prod-server');
prodServer.stdout.on('data', data => callback(data));

export function callback(data) {
  console.debug('lib', data);
  if (data.includes('Indexing finished'))
    init(prodServer);
}
