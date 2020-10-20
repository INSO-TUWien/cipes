import {exec} from 'child_process';
import {init} from '.';


const prodServer = exec('npm run prod-server');
init(prodServer);
