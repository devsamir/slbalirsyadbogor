"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const view_controller_1 = require("../controllers/view.controller");
const router = express_1.Router();
router.get("/", (req, res, next) => {
    res.render("user/v_home", { layout: "user_layout" });
});
router.get("/profil/visi", view_controller_1.viewProfilVisiMisi);
router.get("/profil/sambutan-ketua-yayasan", view_controller_1.viewProfilSambutanYayasan);
router.get("/profil/sambutan-kepala-sekolah", view_controller_1.viewProfilSambutanKepala);
router.get("/profil/sejarah", view_controller_1.viewProfilSejarah);
router.get("/sarana", view_controller_1.viewSaranaPrasarana);
router.get("/kepegawaian/struktur-organisasi", view_controller_1.viewStrukturOrganisasi);
router.get("/kepegawaian/struktur-komite", view_controller_1.viewStrukturKomite);
router.get("/kesiswaan/kegiatan", view_controller_1.viewKegiatanLuar);
router.get("/informasi/berita", (req, res, next) => {
    res.render("user/v_artikel", { layout: "user_layout" });
});
router.get("/informasi/berita/:id", view_controller_1.viewOneArtikel);
router.get("/kesiswaan/ekstrakulikuler", (req, res, next) => {
    res.render("user/v_ekstrakulikuler", { layout: "user_layout" });
});
router.get("/kesiswaan/ekstrakulikuler/:id", view_controller_1.viewOneExtra);
router.get("/informasi/saran", (req, res, next) => {
    res.render("user/v_saran_kritik", { layout: "user_layout" });
});
router.get("/informasi/galeri", (req, res, next) => {
    res.render("user/v_gallery", { layout: "user_layout" });
});
router.get("/informasi/agenda", (req, res, next) => {
    res.render("user/v_agenda", { layout: "user_layout" });
});
router.get("/kepegawaian/direktori-guru", (req, res, next) => {
    res.render("user/v_direktori_guru", { layout: "user_layout" });
});
router.get("/kesiswaan/direktori-siswa", (req, res, next) => {
    res.render("user/v_direktori_siswa", { layout: "user_layout" });
});
router.get("/kesiswaan/pembelajaran", (req, res, next) => {
    res.render("user/v_pembelajaran", { layout: "user_layout" });
});
router.get("/kesiswaan/prestasi-siswa", (req, res, next) => {
    res.render("user/v_prestasi", { layout: "user_layout" });
});
router.get("/kesiswaan/pembelajaran/:id", view_controller_1.viewOnePembelajaran);
router.get("/login", auth_controller_1.isLogged, (req, res, next) => {
    res.render("user/v_login", { layout: false });
});
exports.default = router;
//# sourceMappingURL=view.routes.js.map