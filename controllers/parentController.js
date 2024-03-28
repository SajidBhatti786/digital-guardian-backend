const { model } = require("mongoose");
const { ChildModel } = require("../models/userModel");

const getAllChildren = async (req, res) => {
  try {
    // Extract parent ID from the decoded token
    const parentId = req.decoded.id;

    const children = await ChildModel.find({ parent: parentId }, '_id name username');


    if (children.length === 0) {
      return res
        .status(404)
        .json({ message: "No children found for this parent" });
    }

    return res.status(200).json({status: 200, children });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 200, message: "Failed to retrieve children" });
  }
};

module.exports = { getAllChildren };
