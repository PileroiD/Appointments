import AppointmentModel from "../models/Appointment.js";

const addApp = async (req, res) => {
    try {
        const doc = AppointmentModel({
            name: req.body.name,
            phone: req.body.phone,
            problem: req.body.problem,
            user: req.userId,
        });

        const appointment = await doc.save();

        res.json(appointment);
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).json({
            message: "Failed to create an appointment",
        });
    }
};

const getAll = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({ user: req.userId });
        res.json(appointments);
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).json({
            message: "Failed to get appointments",
        });
    }
};

export default { addApp, getAll };
