import passport from 'passport';

const customCallback = (strategyName, req, res) => {
    passport.authenticate(strategyName, (err, user, info) => {
        if(err) return res.status(500).send(err);
        if(!user) return res.status(400).send(info);
        req.login(user, (err) => {
            if(err) return res.status(500).send(err);
            return res.send(user);
        })
    })(req, res);
}
    
export const postRegister = async (req, res) => {
    customCallback('register', req, res);
}

export const postLogin = async (req, res) => {
    customCallback('login', req, res);
}

export const getLogout = async (req, res) => {
    if(req.isAuthenticated()){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.send({ message: 'Unlogged user' });
        });
    } else {
        res.send({ message: 'There is no logged user' });
    }
}

export const getInfo = async (req, res) => {
    if(req.isAuthenticated()){
        res.send(req.user);
    } else {
        res.send({ message: 'There is no logged user' });
    }
}