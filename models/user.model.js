const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.password, 12);
    this.set("password", hashed);
  }
  done();
});

// THIS METHOD IS AVAILABLE TO MODEL
userSchema.statics.comparePassword = async function(hashed, password) {
  const result = await bcrypt.compare(password, hashed);
  return result;
};

// THIS METHOD IS AVAILABLE TO user record
userSchema.methods.comparePassword = async function(hashed, password) {
  const result = await bcrypt.compare(password, hashed);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
