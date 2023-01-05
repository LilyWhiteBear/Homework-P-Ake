const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var omise = require('omise')({
  'publicKey': 'pkey_test_5u4x4cpik9z4sgwctkn',
  'secretKey': 'skey_test_5u4x4cr1agqiyn5im9s'
});

const cors = require('cors');
app.use(cors());

var jwt = require('jsonwebtoken');

const secretKey = 'test';

const department = [
  {
    name: 'Calendar',
    url: 'string'
  },
  {
    name: 'Table',
    url: 'string'
  },
  {
    name: 'Validate form',
    url: 'string'
  },
  {
    name: 'Omise payment',
    url: 'string'
  },
  {
    name: 'Untitled',
    url: 'string'
  }
]

app.get('/get/permission/:number', async (req, res, next) => {
  try {
    res.send(department.slice(0, req.params.number));
  }
  catch {
    console.log("error at send permission");
  }
  next();
});

app.post('/auth/generate-jwt', async (req, res, next) => {
  try {
    var token = jwt.sign(req.body, secretKey, { algorithm: 'HS256', expiresIn: '2d' });
    res.send({token: token});
  }
  catch {
    console.log("error at generate-jwt");
  }
  next();
});

app.post('/checkout/checkout-by-credit', async (req, res, next) => {
  const { token, name, email, amount } = req.body;
  try {
    const customer = await omise.customers.create({
      email: email,
      description: name,
      card: token
    });

    const charge = await omise.charges.create({
      amount: amount,
      currency: 'thb',
      customer: customer.id
    });

    res.send({
      amount: charge.amount,
      status: charge.status
    })
  }
  catch {
    console.log("error at checkout-by-credit");
  }
  next();
});

app.post('/checkout/checkout-by-internet-banking', async (req, res, next) => {
  const { amount, token } = req.body;
  try {
    const charge = await omise.charges.create({
      amount: amount,
      source: token,
      'currency': 'thb',
      'return_uri': 'http://localhost:4200/main/payment'
    });

    res.send({
      authorizeUri: charge.authorize_uri
    });
  }
  catch {
    console.log("error at checkout-by-internet-banking");
  }
  next();
});

app.use('/checkout/:cmd', async (req, res, next) => {
  console.log(req.headers['authorization']);
  jwt.verify(req.headers['authorization'], secretKey, async (err, decode) => {
    if(err) {
      console.log("Invalid secret key");
    }
    else {
      console.log(decode);
    }
  });
})

app.listen(9000, () => {
  console.log('Running in port 9000');
});
