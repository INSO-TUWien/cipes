import {exec} from 'child_process';
import {addDataListener} from './semi-util';

const prodServer = exec('npm run prod-server');
addDataListener(prodServer);
