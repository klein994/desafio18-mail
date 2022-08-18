import createServer from './createServer.js';

export default function forkServer(app, port){
    createServer(app, port);
}