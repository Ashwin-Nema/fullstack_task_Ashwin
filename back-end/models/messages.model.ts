const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: true,
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
