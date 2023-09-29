const express = require("express")

const router = express.Router()

const upload = require("../utils/multer")

// const hotelController = require("../controllers/hotelController")
const { create, getSingleSubCategory, getAllSubCategory, updateSubCategory, deleteSubCategory,getAllSubCategoryByCategory } = require("../controllers/subCategoryController")

// Create Category
router.post("/create",upload.single("image"), create)

// Get Single Category
router.get("/single/:id", getSingleSubCategory)

// Get All Categorys
router.get("/all", getAllSubCategory)

// Update Data
router.put("/:id",upload.single("image"), updateSubCategory)

// Delete Data
router.delete("/:id", deleteSubCategory)

// Get All SubCategoryies by categoryid
router.get("/:categoryId", getAllSubCategoryByCategory)



module.exports = router