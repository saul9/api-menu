global.express = require('express');
global.mongoose = require('mongoose');
global.config = require('./modules/config/config')[process.env.ENV || 'dev'];
global.autoload = require('auto-load');
global.models = autoload(`${__dirname}/models`);
const router = express.Router();
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, examCode, authtoken");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/api/generic',require('./routes/genericEndpoints'));

app.use(router);

mongoose.connect(config.db.connectionString)
	.then(db => {
    console.log("BD Connected")
    app.listen(process.env.PORT || config.api.port, function () {
      console.log('App listening on port ', process.env.PORT || config.api.port);
    });
  })
  .catch(err => console.log(err));
