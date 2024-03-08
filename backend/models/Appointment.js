import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        problem: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

export default AppointmentModel;
