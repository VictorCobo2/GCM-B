"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
//rutas----------------------------------------
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
dotenv_1.default.config();
//MIDELWAR
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.get("/", (req, res) => {
    res.send(`Funciona la api en el puerto ${port}`);
});
mongoose_1.default
    .connect(`mongodb+srv://admin:lHLKVqgxd1CXEyKr@pruebas.l68x5cx.mongodb.net/test`)
    .then(() => console.log("Conectado a mongo correctamente 🟢"))
    .catch((error) => {
    console.log("No se pudo conectar a la DB  🔴");
    console.error(error);
});
app.listen(port, () => console.log("Esuchando en el puerto: ", port));
