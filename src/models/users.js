import mongoose from "mongoose";

const schema = new mongoose.Schema({
    correo: String,
    edad: Number,
    nombre: String,
    direccion: String,
    telefono: String
})

export default mongoose.model("Users", schema)