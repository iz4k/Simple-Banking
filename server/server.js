// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var User = require('./app/models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR THE API
// =============================================================================
var router = express.Router(); 

//IF NEEDED
// middleware to use for all requests
//router.use(function (req, res, next) {
  //  next();
  //  
  //});

router.route('/users')

//create a new user, need a name and balance field
.post(function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
      if (err)
        res.send(err);

      res.json({
        message: 'User created!'
      });
    });
  })
//return all the users in the collection
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

//delete a user from the collection
router.delete('/users', function (req, res) {
  User.remove({
    _id: req.body.id
  }, function (err, user) {

    if (err) {
      return res.send(err);
    }

    res.json({
      message: 'successfully deleted',
      id: req.params.id
    });
  });
});

//route for 'withdrawing' money from a users account
//returns with msg if not enough money
router.put('/users/withdraw', function (req, res) {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      return res.send(err);
    }

    if (user.balance < req.body.amount) {
      return res.json({
        message: 'Balance too low'
      });
    }
    user.balance = user.balance - req.body.amount;
    user.save(function (err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: 'Withdrawal successful!'
      });
    });
  });
});

//route for adding money to a users bank account
router.put('/users/deposit', function (req, res) {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      return res.send(err);
    }

    user.balance = user.balance + req.body.amount;
    user.save(function (err) {
      if (err) {
        return res.send(err)
      }
      res.json({
        message: 'Deposit successful'
      });
    });
  });
});


// REGISTER ROUTES -------------------------------

// all of the routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankdb'); // connect to our database

app.listen(port);
console.log('Listening on port:', port);