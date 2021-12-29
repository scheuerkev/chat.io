const mongoose = require("mongoose");
const schema = mongoose.Schema;

const namespaceSchema = schema({
  imageUrl: String,
});

const Namespace = mongoose.model("namespace", namespaceSchema);
module.exports = Namespace;
