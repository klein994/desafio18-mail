import log4js from 'log4js'
import { dev } from './../args/args.js'

log4js.configure({
    appenders: {
        console: { 
            type: 'console' 
        },
        infoFile: {
            type: 'file', 
            filename: './logs/info.log' 
        },
        warningFile: { 
            type: 'file', 
            filename: './logs/warning.log' 
        },
        errorFile: { 
            type: 'file', 
            filename: './logs/error.log' 
        },
        infoLogger: {
            type: 'logLevelFilter',
            appender: 'infoFile',
            level: 'info'
        },
        warningLogger: {
            type: 'logLevelFilter',
            appender: 'warningFile',
            level: 'warn'
        },
        errorLogger: {
            type: 'logLevelFilter',
            appender: 'errorFile',
            level: 'error'
        }
    },
    categories: {
        default: {
            appenders: ['infoLogger', 'warningLogger', 'errorLogger'],
            level: 'all'
        },
        dev: {
            appenders: ['infoLogger', 'warningLogger', 'errorLogger', 'console'],
            level: 'all'
        }
    }
})

let logger;

if(dev){
    logger = log4js.getLogger('dev');
}else{
    logger = log4js.getLogger('default');
}

export default logger