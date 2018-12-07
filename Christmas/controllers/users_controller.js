var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  console.log("Begin exports.signup");
  var user = new User({username:req.body.username});
  console.log("after new user exports.signup");
  user.set('hashed_password', hashPW(req.body.password));
  console.log("after hashing user exports.signup");
  user.save(function(err) {
    console.log("In exports.signup");
    console.log(err);
    if (err){
      res.session.error = err;
      res.redirect('/signup');
    } else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'Authenticated as ' + user.username;
      res.redirect('/');
    }
  });
};
exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      err = 'User Not Found.';
    } else if (user.hashed_password ===
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(user);
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'Authenticated as ' + user.username;
        req.session.one = user.one;
        req.session.two = user.two;
        req.session.three = user.three;
        req.session.four = user.four;
        req.session.five = user.five;
        req.session.six = user.six;
        req.session.seven = user.seven;
        req.session.eight = user.eight;
        req.session.nine = user.nine;
        req.session.ten = user.ten;
        req.session.eleven = user.eleven;
        req.session.twelve = user.twelve;
        res.redirect('/');
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
        req.session.msg = err;
        res.redirect('/login');
      });
    }
  });
};
exports.getUserProfile = function(req, res) {
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};
exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.set('one', req.body.one);
    user.set('two', req.body.two);
    user.set('three', req.body.three);
    user.set('four', req.body.four);
    user.set('five', req.body.five);
    user.set('six', req.body.six);
    user.set('seven', req.body.seven);
    user.set('eight', req.body.eight);
    user.set('nine', req.body.nine);
    user.set('ten', req.body.ten);
    user.set('eleven', req.body.eleven);
    user.set('twelve', req.body.twelve);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
        req.session.one = req.body.one;
        req.session.two = req.body.two;
        req.session.three = req.body.three;
        req.session.four = req.body.four;
        req.session.five = req.body.five;
        req.session.six = req.body.six;
        req.session.seven = req.body.seven;
        req.session.eight = req.body.eight;
        req.session.nine = req.body.nine;
        req.session.ten = req.body.ten;
        req.session.eleven = req.body.eleven;
        req.session.twelve = req.body.twelve;
      }
      res.redirect('/user');
    });
  });
};
exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};