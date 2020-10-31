import {exec} from 'child_process';
import {callback} from './semi';

const prodServer = exec('npm run prod-server $CI_PROJECT_DIR');
prodServer.stdout.on('data', data => callback(data));
