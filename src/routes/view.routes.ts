import { NextFunction, Router, Request, Response } from "express";
import { isLogged } from "../controllers/auth.controller";
import {
  viewProfilVisiMisi,
  viewProfilSambutanYayasan,
  viewProfilSambutanKepala,
  viewProfilSejarah,
  viewSaranaPrasarana,
  viewStrukturOrganisasi,
  viewStrukturKomite,
  viewOneArtikel,
  viewOneExtra,
  viewOnePembelajaran,
  viewKegiatanLuar,
} from "../controllers/view.controller";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("user/v_home", { layout: "user_layout" });
});
// PROFIL
router.get("/profil/visi", viewProfilVisiMisi);
router.get("/profil/sambutan-ketua-yayasan", viewProfilSambutanYayasan);
router.get("/profil/sambutan-kepala-sekolah", viewProfilSambutanKepala);
router.get("/profil/sejarah", viewProfilSejarah);
router.get("/sarana", viewSaranaPrasarana);
router.get("/kepegawaian/struktur-organisasi", viewStrukturOrganisasi);
router.get("/kepegawaian/struktur-komite", viewStrukturKomite);
router.get("/kesiswaan/kegiatan", viewKegiatanLuar);
router.get(
  "/informasi/berita",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_artikel", { layout: "user_layout" });
  }
);
router.get("/informasi/berita/:id", viewOneArtikel);
// Ekstrakulikuler
router.get(
  "/kesiswaan/ekstrakulikuler",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_ekstrakulikuler", { layout: "user_layout" });
  }
);
router.get("/kesiswaan/ekstrakulikuler/:id", viewOneExtra);
router.get(
  "/informasi/saran",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_saran_kritik", { layout: "user_layout" });
  }
);
router.get(
  "/informasi/galeri",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_gallery", { layout: "user_layout" });
  }
);
router.get(
  "/informasi/agenda",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_agenda", { layout: "user_layout" });
  }
);
router.get(
  "/kepegawaian/direktori-guru",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_direktori_guru", { layout: "user_layout" });
  }
);
router.get(
  "/kesiswaan/direktori-siswa",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_direktori_siswa", { layout: "user_layout" });
  }
);
router.get(
  "/kesiswaan/pembelajaran",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_pembelajaran", { layout: "user_layout" });
  }
);
router.get(
  "/kesiswaan/prestasi-siswa",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_prestasi", { layout: "user_layout" });
  }
);
router.get("/kesiswaan/pembelajaran/:id", viewOnePembelajaran);
router.get(
  "/login",
  isLogged,
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_login", { layout: false });
  }
);

export default router;
