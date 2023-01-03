const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
  getCategoriesByFilter,
  deleteCategory
} = require("../controllers/category");
const {
  requireSignin,
  adminMiddleware,
  superAdminMiddleware,
} = require("../middleware");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");


router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  addCategory
);
router.get("/category/getcategory", getCategories);
router.get("/category/getbyfilter",getCategoriesByFilter)
router.post(
  "/category/update",
  requireSignin,
  adminMiddleware,
  updateCategories
);
router.post(
  "/category/delete",
  requireSignin,
  adminMiddleware,
  deleteCategories
);

router.delete(
  "/category/delete/:id",
  requireSignin,
  adminMiddleware,
  deleteCategory
);


module.exports = router;