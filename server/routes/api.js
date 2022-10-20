const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UsersPostValidation = require('../middlewares/validation');

const bcrypt = require('bcrypt');

const cloudinary = require('../utils/cloudinary')

const Product = require('../models/product')
const Users = require('../models/user')
const Bids = require('../models/bid')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.get('/product/', (req, res, next) => {
  Product.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/product/', authenticateToken, async (req, res, next) => {
  const { userId, image, productName, category, description,
    initialPrice, latestPrice, numberOfBids, initialDate, endingDate, hasEnded} = req.body;

  try {
    if (userId && image && productName && category &&
      description && initialPrice && latestPrice &&
      initialDate && numberOfBids && endingDate && !hasEnded) {

      const result = await cloudinary.uploader.upload(image, { upload_preset: "auciton-site" });

      if (result) {
        const product = {
          userId,
          productName,
          category,
          description,
          initialPrice,
          latestPrice,
          numberOfBids,
          initialDate,
          endingDate,
          image: result,
          hasEnded
        }

        Product.create(product)
          .then((data) => res.json({
            "error": false,
            "message": "Product created",
            "alertType": "success",
            "data": data
          }))
          .catch(next)
      }
    } else res.json({
      "error": true,
      "message": "One or more of the following input are invalid",
      "alertType": "danger"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

router.patch('/product/:id', authenticateToken, async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })
  const user = await Users.findOne({ _id: req.body.biderId })
  console.log(user);
  const updatedNumberofBids = product.numberOfBids + 1
  const updates = {
    latestPrice: req.body.price,
    numberOfBids: updatedNumberofBids
  }
  const productPrice = Number(product.latestPrice)
  const bidPrice = Number(updates.latestPrice)
  const minBid = bidPrice - productPrice

  if ( product.userId == req.body.biderId) {
    res.json({
      "error": true,
      "message" : "You can't bid on your own products"
    })  
  }else if (user.CreditCard.month !== "MM" || user.CreditCard.year !== "YY"){
  if (productPrice < bidPrice) {
    if (productPrice < 10) {
      if (minBid >= 1) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 1}$`
        })
      }
    }
    if (productPrice >= 10 && productPrice < 100) {
      if (minBid >= 10) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 10}$`
        })
      }
    }
    if (productPrice >= 100 && productPrice < 5000) {
      if (minBid >= 100) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 100}$`
        })
      }
    }
    if (productPrice >= 5000 && productPrice < 10000) {
      if (minBid >= 500) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 500}$`
        })
      }
    }
    if (productPrice >= 10000 && productPrice < 50000) {
      if (minBid >= 1000) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 1000}$`
        })
      }
    }
    if (productPrice >= 50000) {
      if (minBid >= 5000) {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: updates })
          .then((data) => res.json({
            "error": false,
            "message": "Your bid has been accepted",
            "data": data
          }))
          .catch(err =>
            res.json({
              "error": true,
              "message": `couldn't updated your offer, please try again.`,
              "err": err
            }))
      } else {
        res.json({
          "error": true,
          "message": `Your bid must be atlist ${productPrice + 5000}$`
        })
      }
    }
  } else {
    res.json({
      "error": true,
      "message": `Your bid must be higher than the product price!`
    })
  }
  }else{
    res.json({
      "error": true,
      "message" : "You need to add Credit Card before bid"
    })  
  }
})
// router.put('/updateProduct/', (req, res, next) => {
//   Product.find({})
//     .then((products) => {
//       // const date = new Date();
//       products.map(async(product, index) => {
//         // const dividedDate = product.endingDate.split(".")
//         // Number(dividedDate[0]) < date.getDate() &&
//         // Number(dividedDate[1]) <= date.getMonth() + 1 &&
//         // Number(dividedDate[2]) <= date.getFullYear() && 
//         const updated = await Product.findOneAndUpdate({ _id: product.id}, req.body[index])
//         console.log(updated);
//       })
//       res.json(products)
//     })        
//     .catch(next)
// })

router.delete('/product/:id', authenticateToken, (req, res, next) => {
  Product.findOneAndDelete({ _id: req.params.id })
    .then(async (data) => {
      await cloudinary.uploader.destroy(data.image.public_id, { resource_type: "image" })
      .then(result => console.log(result))
      .catch(next)
      res.json(data)
    })
    .catch(next)
})

router.get('/users/:id', (req, res, next) => {
  Users.findOne({_id: req.params.id})
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.get('/users/', (req, res, next) => {
  Users.find({})
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.patch('/userCard/:id', authenticateToken, (req, res, next) => {
  const { cardNumber, month, year, cvv, idNumber } = req.body;
  
  if (cardNumber && month && year && cvv && idNumber) {
    Users.findOneAndUpdate({ _id: req.params.id }, { $set: { CreditCard: {
      cardNumber: cardNumber,
      month,
      year,
      cvv,
      idNumber
    } } })
      .then((data) => res.json({
        "error": false,
        "message": "Your details have been accepted",
        "alertType": "success",
        "data": data
      }))
      .catch(err =>
        res.json({
          "error": true,
          "message": `couldn't updated your Credit Card, please try again.`,
          "alertType": "danger",
          "err": err
        }))
  } else res.json({ error: `this input is empty -> ${req.body}` })
})

router.patch('/users/:id', authenticateToken, async (req, res, next) => {

  const result = await cloudinary.uploader.upload(req.body.avatar, { upload_preset: "auciton-site" });

  if (result) {
      Users.findOneAndUpdate({ _id: req.params.id }, { $set: { avatar: result } })
        .then((data) => res.json({
          "error": false,
          "message": "Your picture have been updated",
          "alertType": "success",
          "data": data
        }))
        .catch(err =>
          res.json({
            "error": true,
            "message": `couldn't updated your profile, please try again.`,
            "alertType": "danger",
            "err": err
          }))
  } else res.json({ error: `this input is empty -> ${req.body}` })
})

router.delete('/users/:id', authenticateToken, (req, res, next) => {
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      Product.find({userId: data._id})
        .then((productsData) => {
          productsData.map( (product) => {
            Product.findOneAndDelete({ _id: product._id })
              .then(async (data) => {
                await cloudinary.uploader.destroy(data.image.public_id, { resource_type: "image" })
                .then(result => console.log(result))
                .catch(next)
                res.json(data)
              })
              .catch(next)
          })
        })
        .catch(next)
          res.json(data)
        })
    .catch(next)
})

router.get('/bids/', (req, res, next) => {
  Bids.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/bids/', authenticateToken, (req, res, next) => {
  req.body.biderId && req.body.biderName && req.body.bidDate && req.body.price && req.body.productId ?
    Bids.create(req.body)
      .then((data) => res.json(data))
      .catch(next) :
    res.json({ error: 'this input is empty' })
})

router.post('/getProductBids/', authenticateToken, (req, res, next) => {
  req.body.productId ?
  Bids.find({ productId: req.body.productId })
    .then((data) => {
      const winBid = data[data.length -1].biderId
      Users.find({_id: winBid})
        .then((user) => {
          res.json(user)
        })
        .catch(next)
    })
    .catch(next) :
  res.json({ error: 'no product id has given' })
})

router.patch('/endAuction/:id', authenticateToken, (req, res, next) => {
    Product.findOneAndUpdate( {_id: req.params.id}, { $set:{ hasEnded: true }})
      .then( data => {
          res.json(data)
      })
    .catch(next)
})

router.patch('/checkEndOfAuction/', (req, res, next) => {
  Product.find({})
    .then((products) => {
      const date = new Date();
      products.map(async(product) => {
        const dividedDate = product.endingDate.split(".")
        if(Number(dividedDate[0]) < date.getDate() &&
        Number(dividedDate[1]) <= date.getMonth() + 1 &&
        Number(dividedDate[2]) <= date.getFullYear()){
          const update = await Product.findOneAndUpdate({ _id: product._id}, { $set:{ hasEnded: true }})
          update &&
          next()
        }
      })
      res.json("no changes")
    })        
    .catch(next)
})

router.post('/checkEndOfAuction/', authenticateToken,  (req, res, next) => {
  Users.find({ _id: req.body.user._id })
    .then((user) => {
      user[0]._id == req.body.product.userId ? 
      res.json(true) :
      res.json(false)
    })        
    .catch(next)
})

// router.delete('/bids/:id', (req, res, next) => {
//   Bids.findOneAndDelete({ _id: req.params.id })
//     .then((data) => res.json(data))
//     .catch(next)
// })

router.post('/register', UsersPostValidation, async function (req, res, next) {
  const { email, firstName, lastName, avatar, phone } = req.body
  let { password } = req.body
  const userExist = await Users.findOne({ email })

  if (!userExist) {
    password = await bcrypt.hash(password, 10)
    const user = {
      firstName,
      lastName,
      password,
      email,
      avatar,
      phone
    }
    Users.create(user).then(async(newUser) => {
      const accessToken = generateAccessToken(newUser)
      res.json(
        {
        "error": false,
        "message": "user registered successfully",
        userData: newUser,
        accessToken: accessToken
      })
    }).catch(err => {
      res.json({
        "error": true,
        "message": `couldn't register user ${err}`,
        "err": err
      })
    })
  } else {
    res.json({
      "error": true,
      "message": "user already registered"
    })
  }
})

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body

  const user = await Users.findOne({ email })
  if (user) {
    const result = await bcrypt.compare(password, user.password)
    console.log(user);
    if (result) {
      const accessToken = generateAccessToken(user)
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

      res.json({
        "error": false,
        "message": "login successfully",
        userData: user,
        accessToken: accessToken
      })
    } else {
      res.json({
        "error": true,
        "message": "email or password is wrong"
      })
    }
  } else return res.json({
    "error": true,
    "message": "email or password is wrong"
  })
});

function generateAccessToken(user) {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
  // return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}


module.exports = router