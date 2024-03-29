const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 50 },
  last_name: { type: String, required: true, maxLength: 50 },
  username: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true },
  membership_status: {
    type: String,
    enum: ["guest", "member"],
    required: true,
  },
  admin: { type: Boolean, required: true },
});

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  }

  return fullname;
});

module.exports = mongoose.model("User", UserSchema);
