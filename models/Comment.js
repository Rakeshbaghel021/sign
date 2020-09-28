// All requires

const mongoose = require("mongoose");

// Extracting the schema from the mongoose

const Schema = mongoose.Schema;

// Creating the schema for the comment

const commentSchema = new Schema({
  body: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
});

// making the model of the schema and exporting the model

module.exports = mongoose.model("Comment", commentSchema);
