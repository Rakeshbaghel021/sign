// All requires

const mongoose = require("mongoose");
const URLSlugs = require("mongoose-url-slugs");

// Extracting the schema from the mongoose

const Schema = mongoose.Schema;

// Creating the schema for the article

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  tagList: {
    type: String,
  },
  commentsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// for slug the title of article

articleSchema.plugin(URLSlugs("title", { field: "myslug" }));

// making the model of the schema and exporting the model

module.exports = mongoose.model("Article", articleSchema);
