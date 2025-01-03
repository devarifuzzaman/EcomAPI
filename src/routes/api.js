import express from "express";
const router = express.Router();
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import * as ProductController from "../controllers/ProductController.js";
import * as UserController from "../controllers/UserController.js";
import * as WishlistController from "../controllers/WishListController.js";
import * as CartListController from "../controllers/CartListController.js";
import * as InvoiceController from "../controllers/InvoiceController.js";
import * as FeatureController from "../controllers/FeaturesController.js";


//Api route for Product
router.get('/ProductBrandList',ProductController.ProductBrandList);
router.get('/ProductCategoryList',ProductController.ProductCategoryList);
router.get('/ProductList',ProductController.ProductList);
router.get('/ProductSliderList',ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory);
router.get('/ProductListBySimilar/:CategoryID',ProductController.ProductListBySimilar);
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword);
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails);


router.post('/ProductListByFilter',ProductController.ProductListByFilter);




// Users
router.get('/Login/:email',UserController.Login);
router.get('/OtpVerify/:email/:otp',UserController.OtpVerification);
router.get('/Logout',AuthMiddleware,UserController.LogOut);
router.post('/CreateProfile',AuthMiddleware,UserController.CreateProfile);
router.post('/UpdateProfile',AuthMiddleware,UserController.UpdateProfile);
router.get('/ReadProfile',AuthMiddleware,UserController.ReadProfile);

//Wish list
router.post('/CreateWishlist/:productID',AuthMiddleware,WishlistController.CreateWishlist);
router.post('/RemoveWishlist/:wishlistID',AuthMiddleware,WishlistController.RemoveWishlist);
router.get('/Wishlist',AuthMiddleware,WishlistController.Wishlist);

//Cart list
router.post('/CreateCartList',AuthMiddleware,CartListController.SaveCartList);
router.post('/RemoveCartList/:cartID',AuthMiddleware,CartListController.RemoveCartList);
router.post('/UpdateCartList/:cartID',AuthMiddleware,CartListController.UpdateCartList);
router.get('/CartList',AuthMiddleware,CartListController.CartList);

//Invoice ssl-commerce
router.get("/createInvoice",AuthMiddleware,InvoiceController.CreateInvoice);
router.get("/InvoiceList",AuthMiddleware,InvoiceController.InvoiceList);
router.get("/InvoiceProductList/:invoice_id",AuthMiddleware,InvoiceController.InvoiceProductList);

router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess);
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel);
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail);
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN);

//Features
router.get("/featuresList",FeatureController.FeatureList);

//Create Review
router.post("/createReview",AuthMiddleware,ProductController.CreateProductReview);
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList);

export default router;