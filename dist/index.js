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
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
require("reflect-metadata");
const env_1 = require("./env");
const Extracurricular_1 = __importDefault(require("./models/Extracurricular"));
const Post_1 = __importDefault(require("./models/Post"));
const Suggestion_1 = __importDefault(require("./models/Suggestion"));
const Teacher_1 = __importDefault(require("./models/Teacher"));
const User_1 = __importDefault(require("./models/User"));
const Gallery_1 = __importDefault(require("./models/Gallery"));
const Landing_1 = __importDefault(require("./models/Landing"));
const Profil_1 = __importDefault(require("./models/Profil"));
const Halaman_1 = __importDefault(require("./models/Halaman"));
const Agenda_1 = __importDefault(require("./models/Agenda"));
const Student_1 = __importDefault(require("./models/Student"));
const Pembelajaran_1 = __importDefault(require("./models/Pembelajaran"));
const Prestasi_1 = __importDefault(require("./models/Prestasi"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const view_routes_1 = __importDefault(require("./routes/view.routes"));
const extra_routes_1 = __importDefault(require("./routes/extra.routes"));
const gallery_routes_1 = __importDefault(require("./routes/gallery.routes"));
const home_routes_1 = __importDefault(require("./routes/home.routes"));
const landing_routes_1 = __importDefault(require("./routes/landing.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const suggestion_routes_1 = __importDefault(require("./routes/suggestion.routes"));
const profil_routes_1 = __importDefault(require("./routes/profil.routes"));
const halaman_routes_1 = __importDefault(require("./routes/halaman.routes"));
const agenda_routes_1 = __importDefault(require("./routes/agenda.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const pembelajaran_routes_1 = __importDefault(require("./routes/pembelajaran.routes"));
const prestasi_routes_1 = __importDefault(require("./routes/prestasi.routes"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: "mysql",
            host: env_1.DB_HOST,
            username: env_1.DB_USER,
            password: env_1.DB_PASS,
            database: env_1.DB_NAME,
            synchronize: true,
            logging: true,
            entities: [
                Extracurricular_1.default,
                Post_1.default,
                Suggestion_1.default,
                Teacher_1.default,
                User_1.default,
                Gallery_1.default,
                Landing_1.default,
                Profil_1.default,
                Halaman_1.default,
                Agenda_1.default,
                Student_1.default,
                Pembelajaran_1.default,
                Prestasi_1.default,
            ],
        });
        console.log("Database Connected");
        const app = express_1.default();
        app.use(express_1.default.json());
        if (env_1.NODE_ENV === "development")
            app.use(morgan_1.default("dev"));
        app.use(cookie_parser_1.default());
        app.use(helmet_1.default());
        app.use(cors_1.default({
            origin: env_1.BASE_URL,
            credentials: true,
        }));
        app.engine(".hbs", express_handlebars_1.default({
            extname: ".hbs",
            partialsDir: path_1.default.join(__dirname, "../views"),
            layoutsDir: path_1.default.join(__dirname, "../views"),
        }));
        app.set("view engine", ".hbs");
        app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
        app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "../assets")));
        app.use(function (req, res, next) {
            res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline'; script-src * 'unsafe-inline'; img-src * data:");
            return next();
        });
        app.use("/api/user", user_routes_1.default);
        app.use("/api/auth", auth_routes_1.default);
        app.use("/api/teacher", teacher_routes_1.default);
        app.use("/api/post", post_routes_1.default);
        app.use("/api/extra", extra_routes_1.default);
        app.use("/api/gallery", gallery_routes_1.default);
        app.use("/api/landing", landing_routes_1.default);
        app.use("/api/home", home_routes_1.default);
        app.use("/api/suggestion", suggestion_routes_1.default);
        app.use("/api/profil", profil_routes_1.default);
        app.use("/api/halaman", halaman_routes_1.default);
        app.use("/api/agenda", agenda_routes_1.default);
        app.use("/api/student", student_routes_1.default);
        app.use("/api/pembelajaran", pembelajaran_routes_1.default);
        app.use("/api/prestasi", prestasi_routes_1.default);
        app.use("/admin", admin_routes_1.default);
        app.use("/", view_routes_1.default);
        app.get("*", (req, res, next) => {
            res.render("v_notfound", { layout: false });
        });
        app.use(errorHandler_1.default);
        const port = env_1.PORT || 4000;
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