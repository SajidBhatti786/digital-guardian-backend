const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    collection: "parent", // Assuming you want to keep the collection name as 'users'
    toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
    toObject: { virtuals: true },
  }
);
parentSchema.virtual("parent_id").get(function () {
  return this._id.toHexString(); // Convert the '_id' to a string
});
const ParentModel = mongoose.model("Parent", parentSchema);

module.exports = ParentModel;
