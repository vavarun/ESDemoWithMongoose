const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent'},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    time: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  {
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);
