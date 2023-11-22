const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // Add email validation regex here if needed
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
    collection: "parent", // Collection name for parent documents
    toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
    toObject: { virtuals: true },
  }
);

parentSchema.virtual("parent_id").get(function () {
  return this._id.toHexString(); // Convert the '_id' to a string
});

const ParentModel = mongoose.model("Parent", parentSchema);

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent", // Reference to the Parent model
      required: true,
    },
  },
  {
    collection: "child", // Collection name for child documents
    toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
    toObject: { virtuals: true },
  }
);

const ChildModel = mongoose.model("Child", childSchema);

module.exports = {
  ParentModel,
  ChildModel,
};
