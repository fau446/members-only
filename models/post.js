const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  date_posted: { type: Date, default: Date.now },
});

PostSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
