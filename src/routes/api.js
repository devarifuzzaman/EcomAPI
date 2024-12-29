import express from "express";
const router = express.Router();
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import * as ProductController from "../controllers/ProductController.js";


//Api route for Product
router.get('/ProductBrandList',ProductController.ProductBrandList)
router.get('/ProductCategoryList',ProductController.ProductCategoryList)
router.get('/ProductList',ProductController.ProductList)
router.get('/ProductSliderList',ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory)
router.get('/ProductListBySimilar/:CategoryID',ProductController.ProductListBySimilar)
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)

// router.post('/ProductListByFilter',ProductController.ProductListByFilter);




// Users
// router.post("/registration",UserController.Registration);
// router.post("/login",UserController.Login)
// router.get("/profileDetails",AuthMiddleware,UserController.ProfileDetails);
// router.post("/profileUpdate",AuthMiddleware,UserController.UpdateProfile);
// router.get("emilVerify",UserController.EmailVerification);
// router.post("/codeVerify",UserController.CodeVerification);
// router.post("/resetPassword",UserController.ResetPassword);





export default router;