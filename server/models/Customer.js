const mongoose = require('mongoose');

const Customer = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    city: {
      type: String,
    },
    appointment_ids: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
    ],
  },
  {
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = Customer;
