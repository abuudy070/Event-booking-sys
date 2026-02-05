import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
  email: String,
  tickets: Number,
  status: {
    type: String,
    default: "pending", // pending | approved | rejected
  },
});

export default mongoose.model("Booking", bookingSchema);