
module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req,res, next){   //para que el usuario no vea rutas 
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};