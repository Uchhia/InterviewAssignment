const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const loggerSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  traceId: {
    type: String,
    required: true,
  },

  spanId: {
    type: String,
    required: true,
  },
  commit: {
    type: String,
    required: true,
  },
  metadata: {
    parentResourceId: {
      type: String,
      required: true,
    },
  },
});

const Logger = mongoose.model("Logs", loggerSchema);

module.exports = Logger;
