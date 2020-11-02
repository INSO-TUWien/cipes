import {init} from './main';

export function addDataListener(prodServer) {
  prodServer.stdout.on('data', data => {
    console.debug('lib', data);
    if (data.includes('Indexing finished'))
      init(prodServer);
  });
}
