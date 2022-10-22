require("dotenv").config();
const express = require("express");
const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const app = express();
// This is your test secret API key.
app.use(cors())
app.use(express.json())
// app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to HANDY website.")
})


const array = []
const calculateOrderAmount = (items) => {   
      items.map((item) => {
        const { price, cartQuantity } = item
        const cartItemAmount = price * cartQuantity
        console.log(cartItemAmount)
        return array.push(cartItemAmount)
      });
      // console.log(array)
      const totalAmount = array.reduce((a,b) => {
        return a + b
      }, 0)
      // console.log(totalAmount)
    return totalAmount*100;
  };

app.post("/create-payment-intent", async (req, res) => {
  const { items, billing, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "thb",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    billing: {
        address:{
            line1: billing.line1,
            line2: billing.line2,
            city: billing.city,
            postal_code: billing.postal_code,
            
        },
        name: billing.name,
        phone: billing.phone,
    },
    // receipt_email: customerEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));