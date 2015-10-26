var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var Model     = {};

var companySchema = new Schema({
  id        : Number,
  abbr      : String,
  name      : String,
  desc      : String,
  category  : String,
  contact   : {
    address : [ String ],
    city    : String,
    country : String,
    phone   : String,
    email   : String,
  },
  url       : String,
  billing   : {
    currency  : String,
    email     : String
  }

}, {
  collection  : 'company'
});
Model.company = mongoose.model('Company', companySchema);

var userSchema = new Schema({
  company_id  : String,
  username    : String,
  password    : String,
  name        : {
    first : String,
    last  : String
  },
  email       : String,
  role        : String,
  log         : [ String ]

}, {
  collection  : 'users'
});
Model.user = mongoose.model('User', userSchema);

var policySchema = new Schema({
  id          : String,
  company_id  : String,
  type        : String,
  title       : String,
  conditions  : String,
  minimum     : {
    days  : String,
    hours : String
  },
  rooms       : {
    company_id  : String,
    rooms_id    : Number
  },
  adjustment  : String,
  adjustment_amount : Number,
  start       : Date,
  end         : Date,
  recurring   : {
    start_day   : String,
    end_day     : String,
    start_time  : String,
    end_time    : String,
    exp_datetime: Date
  }

}, {
  collection  : 'policy'
});
Model.policy = mongoose.model('Policy', policySchema);

var inventorySchema = new Schema({
  id          : String,
  company_id  : String,
  type        : String,
  title       : String,
  description : String,
  category    : String,
  images      : [ String ],
  status      : String,
  lastupdate: Date,
  base_price  : Number
}, {

  collection  : 'inventory'
});
Model.inventory = mongoose.model('Inventory', inventorySchema);

var roleSchema = new Schema({
  company_id  : String,
  name        : String,
  read       : [ String ],
  write      : [ String ]
}, {

  collection  : 'role'
});
Model.role = mongoose.model('Role', roleSchema);

var reservationSchema = new Schema({
  company_id  : String,
  id          : String,
  name        : {
    first : String,
    last  : String
  },
  telephone   : String,
  email       : String,
  start       : {
    date : Date,
    time : String
  },
  end         : {
    date : Date,
    time : String
  },
  rooms       : [ String ],
  policy_id   : String,
  customer : Number,
  occupants   : {
    adults   : Number,
    children : Number
  },
  price      : Number,
  status     : String,
  date : Date
}, {

  collection  : 'reservations'
});
Model.reservation = mongoose.model('Reservation', reservationSchema);

var customerSchema = new Schema({
  id          : Number,
  company_id  : String,
  name        : {
    first : String,
    last  : String
  },
  address     : {
    street : [ String ],
    city   : String,
    postal_code : String,
    country  : String
  },
  email       : String,
  telephone   : String
}, {

  collection  : 'customer'
});
Model.customer = mongoose.model('Customer', customerSchema);

module.exports = Model;

