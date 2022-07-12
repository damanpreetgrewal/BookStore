const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = (product) => {
  const cartProdIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProdIndex >= 0) {
    newQuantity = this.cart.items[cartProdIndex].quantity + 1;
    updatedCartItems[cartProdIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = (productId) => {
  const updatedCartitems = this.cart.items.filter((cp) => {
    return cp.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartitems;
  return this.save();
};

userSchema.methods.clearCart = () => {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);