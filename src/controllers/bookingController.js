import Booking from "../models/booking.js";
import Event from "../models/event.js";

export const createBooking = async (req, res) => {
  try {
    const { eventId, name, email, tickets } = req.body;

    if (!eventId || !name || !email || tickets === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedTickets = Number(tickets);
    if (!Number.isFinite(parsedTickets) || parsedTickets <= 0) {
      return res.status(400).json({
        success: false,
        message: "Tickets must be a positive number",
      });
    }

    if (req.user?.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admins cannot create bookings",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const booking = await Booking.create({
      eventId: event._id,
      name: req.user?.name ?? name,
      email: req.user?.email ?? email,
      tickets: parsedTickets,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error Occured in the create booking controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const filter =
      req.user?.role === "ADMIN" || req.user?.role === "SUPERADMIN"
        ? {}
        : { email: req.user?.email };
    const bookings = await Booking.find(filter)
      .populate("eventId", "title date location capacity")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error Occured in the get bookings controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking approved successfully",
      booking,
    });
  } catch (error) {
    console.error("Error Occured in the approve booking controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    console.error("Error Occured in the reject booking controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
      booking,
    });
  } catch (error) {
    console.error("Error Occured in the cancel booking controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};