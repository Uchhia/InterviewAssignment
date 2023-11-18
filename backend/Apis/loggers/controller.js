const Log = require("./model");

exports.addLogs = async (req, res) => {
  await Log.create(req.body)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
};

exports.getLogs = async (req, res) => {
  try {
    const level = req.query.level ? req.query.level.trim() : "";
    const message = req.query.message ? req.query.message.trim() : "";
    const resourceId = req.query.resourceId ? req.query.resourceId.trim() : "";
    const timestamp = req.query.timestamp ? req.query.timestamp.trim() : "";
    const traceId = req.query.traceId ? req.query.traceId.trim() : "";
    const spanId = req.query.spanId ? req.query.spanId.trim() : "";
    const commit = req.query.commit ? req.query.commit.trim() : "";
    const parentResourceId = req.query.parentResourceId
      ? req.query.parentResourceId.trim()
      : "";

    const query = {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      parentResourceId,
    };

    for (const key in query) {
      // Check if the value is an empty string
      if (query[key] === "") {
        // If yes, delete the property
        delete query[key];
      }
    }

    const regexGenerator = (query, name) => {
      if (name[0] === "parentResourceId") {
        console.log("aa gysa");
        name = "metadata.parentResourceId";
      }
      //console.log(name);
      const regex = {
        level: { level: { $regex: query.level } },
        message: { message: { $regex: query.message } },
        resourceId: { resourceId: { $regex: query.resourceId } },
        //timestamp: { $gte: startDate, $lte: endDate },
        traceId: { traceId: { $regex: query.traceId } },
        spanId: { spanId: { $regex: query.spanId } },
        commit: { commit: { $regex: query.commit } },
        ["metadata.parentResourceId"]: {
          ["metadata.parentResourceId"]: {
            $regex: query.parentResourceId,
          },
        },
      };
      return regex[name];
    };

    const searchObject = regexGenerator(query, Object.keys(query));
    console.log(searchObject);

    const logData = await Log.find(searchObject);
    res.send(logData);
  } catch (err) {
    console.log(err.message);
    res.send(err.messgae);
  }
};
