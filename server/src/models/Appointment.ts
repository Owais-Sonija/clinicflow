// server/src/models/Appointment.ts

import mongoose, { Schema, Document } from "mongoose";

// Appointment Interface
export interface IAppointment extends Document {
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "complete" | "cancelled";
  reason: string;
  notes?: string;
  prescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment Schema
const AppointmentSchema = new Schema<IAppointment>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "complete", "cancelled"],
      default: "pending",
    },
    reason: {
      type: String,
      required: [true, "Reason for appointment is required"],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    prescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Prevent double booking
AppointmentSchema.index(
  { doctor: 1,  date: 1, timeSlot: 1 }, // index on doctor, date, and timeSlot fields is set 1 because it is unique
  { unique: true },
);

// Export Appointment Model
export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
