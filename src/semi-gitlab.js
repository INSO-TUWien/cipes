import {exec} from 'child_process';
import {callback} from './semi';

const prodServer = exec('npm run prod-server /builds');
prodServer.stdout.on('data', data => callback(data));
