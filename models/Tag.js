// All requires

const mongoose = require("mongoose");

// Extracting the schema from the mongoose

const Schema = mongoose.Schema;

// Creating the schema for the tag

const tagSchema = new Schema({
  body: {
    type: String,
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
});

// making the model of the schema and exporting the model

module.exports = mongoose.model("Tag", tagSchema);
