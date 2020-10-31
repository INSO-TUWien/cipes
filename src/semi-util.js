import {init} from '.';

export function addDataListener(prodServer) {
  prodServer.stdout.on('data', data => {
    console.debug('lib', data);
    if (data.includes('Indexing finished'))
      init(prodServer);
  });
}
