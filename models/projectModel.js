const Mongoose = require("mongoose");
const projectSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model(
  "projectModel",
  projectSchema,
  "PROJECTS_COLLECTION"
);

