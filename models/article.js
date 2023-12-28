const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
// const mar = marked();
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  try {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    if (this.markdown) {
      this.sanitizedHTML = dompurify.sanitize(this.markdown);
      // this.sanitizedHTML = marked(this.markdown);
    }
    next();
  } catch (err) {
    next(err); // Pass the error to the next middleware/hook
  }
});

module.exports = mongoose.model("Article", articleSchema);
