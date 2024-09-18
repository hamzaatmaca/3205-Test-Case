"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const users = [
    { email: "jim@gmail.com", number: "221122" },
    { email: "jam@gmail.com", number: "830347" },
    { email: "john@gmail.com", number: "221122" },
    { email: "jams@gmail.com", number: "349425" },
    { email: "jams@gmail.com", number: "141424" },
    { email: "jill@gmail.com", number: "822287" },
    { email: "jill@gmail.com", number: "822286" },
];
let pendingRequest = null;
app.post("/search", (req, res) => {
    const { email, number } = req.body;
    if (pendingRequest) {
        clearTimeout(pendingRequest);
    }
    pendingRequest = setTimeout(() => {
        const result = users.filter((user) => {
            return user.email === email && (!number || user.number === number);
        });
        res.json(result);
        pendingRequest = null;
    }, 5000);
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
