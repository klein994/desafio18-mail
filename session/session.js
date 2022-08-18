import session from 'express-session';
import { mongoStore } from './../configs/config.js';
const sessionHandler = session(mongoStore);

export default sessionHandler;