import passport from 'passport';
import { Strategy } from 'passport-local';
import bCrypt from 'bcrypt';
import logger from '../logs/logger.js';
import { users, carts, mail } from './../daos/index.js';
import { mailReceiver } from './../configs/config.js';

passport.use('register', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try{
        const { file } = req;
        const { name, lastname, address, age, phone } = req.body;
        const image = file ? `uploads/${file.filename}` : null;
        const avatar = req.body.avatar ? req.body.avatar : null;
        
        if(!image && !avatar){
            logger.warn('No image or avatar was provided');
            return done(null, false, { message: 'You must upload an image' });
        }

        const user = await users.saveIfDontExists({ email, password: createHash(password), name, lastname, phone, address, age, image, avatar });
        if(user){
            logger.info(`User ${user.name} ${user.lastname} registered`);
            carts.save({ userId: user._id });
            mail.sendMailInRegister(user, mailReceiver);
            done(null, user);
        }else{
            logger.warn(`User with email ${email} already exists`);
            done(null, false, { message: 'User already exists' });
        }
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
        try{
            const user = await users.findByUsername(email);
            if(user && bCrypt.compareSync(password, user.password)){
                logger.info(`User ${user.name} logged in`);
                done(null, user);
            }else{
                if(!user) logger.warn(`User with email ${email} does not exists`);
                if(user?.password && !bCrypt.compareSync(password, user.password)) logger.warn(`User with email ${email} and password ${password} does not match`);
                done(null, false, { message: 'Incorrect email or password' });
            }
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await users.getById(id)
        done(null, user)
    } catch(error) {
        done(error)
    }
});

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

function createHash (password ) {
    return bCrypt.hashSync ( password , bCrypt.genSaltSync (10), null);
}