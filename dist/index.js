"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
require("reflect-metadata");
const Extracurricular_1 = __importDefault(require("./models/Extracurricular"));
const Post_1 = __importDefault(require("./models/Post"));
const Suggestion_1 = __importDefault(require("./models/Suggestion"));
const Teacher_1 = __importDefault(require("./models/Teacher"));
const User_1 = __importDefault(require("./models/User"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const view_routes_1 = __importDefault(require("./routes/view.routes"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: "mysql",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
            entities: [Extracurricular_1.default, Post_1.default, Suggestion_1.default, Teacher_1.default, User_1.default],
        });
        console.log("Database Connected");
        const app = express_1.default();
        app.use(express_1.default.json());
        if (process.env.NODE_ENV === "development")
            app.use(morgan_1.default("dev"));
        app.use(cookie_parser_1.default());
        app.use(helmet_1.default());
        app.use(cors_1.default({
            origin: process.env.BASE_URL,
            credentials: true,
        }));
        app.engine(".hbs", express_handlebars_1.default({
            extname: ".hbs",
            partialsDir: path_1.default.join(__dirname, "../views"),
            layoutsDir: path_1.default.join(__dirname, "../views"),
        }));
        app.set("view engine", ".hbs");
        app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
        app.use("/api/user", user_routes_1.default);
        app.use("/api/auth", auth_routes_1.default);
        app.use("/", view_routes_1.default);
        app.use(errorHandler_1.default);
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`App Running in Port ${port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
main();
//# sourceMappingURL=index.js.map