const Mongoose = require("mongoose");
const userSchema = new Mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

module.exports = Mongoose.model("userModel", userSchema, "USER_COLLECTION");
