import { fork } from './../args/args.js'
import clusterServer from './clusterServer.js';
import forkServer from './forkServer.js';

export default function initializeServer(app, port){
    if(fork){
        forkServer(app, port);
    }else{
        clusterServer(app, port);
    }
}