const { Message } = require("../database/models");

exports.findMessagePerRoomId = (roomId) => {
  return Message.find({ room: roomId }).sort({ createdAt: 1 }).exec();
};
