const { Namespace } = require("../database/models");

exports.getNamespace = () => {
  return Namespace.find({}).exec();
};
