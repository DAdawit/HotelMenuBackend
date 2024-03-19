import { Router } from "express";
import UserController from "../controller/UserController";
import CartController from "../controller/CartController";
import MenuController from "../controller/MenuController";
import OrderController from "../controller/OrderController";
import authMiddleware from "../middleware/authMiddleware";
import CategoryController from "../controller/CategoryController";
import SubcategoryController from "../controller/SubCategoryController";
import WishListController from "../controller/WishListController";
import ProductRateingController from "../controller/ProductReviewsController";
import ReportProductController from "../controller/ReportProductController";
import AdminController from "../controller/AdminController";
import MealTimeController from "../controller/MealTimeController";
import HeroController from "../controller/HeroController";
const router = Router();

// Routes that do not require authentication
router.post("/login", UserController.LoginUser);
router.get("/users", UserController.getUsers);
router.post("/users", UserController.addUser);
router.put("/change-profile-pic/:id", UserController.updateProfilePic);
router.get("/heros", HeroController.getHeroSection);

router.get("/products", MenuController.get);

router.get("/products/related/:id", MenuController.relatedProducts);
router.get("/products/:id", MenuController.detail);
router.get("/products/category/:id", MenuController.featchMenuesByCategory);
router.get("/products/subCategory/:id", MenuController.featchMenuBySubCategory);
router.get("/categories", CategoryController.getCategories);

router.get("/mealTimes", MealTimeController.getMealTimes);

// Group routes that require authentication
const authRoutes = Router();
authRoutes.use(authMiddleware);

authRoutes.get("/admin/users", AdminController.getUsers);
authRoutes.put("/admin/users/:id/activate", AdminController.activateUser);
authRoutes.put("/admin/users/:id/deactive", AdminController.deActivateUser);

authRoutes.get(
  "/admin/reporeted-products",
  AdminController.getReportedProducts
);
authRoutes.post("/admin/add-menu", MenuController.add);
router.put("/admin/add-menuImage/:id", MenuController.addOrChangeMenuImage);

authRoutes.put("/admin/product/:id", MenuController.updateProduct);
authRoutes.put("/admin/order/:id/change-status", OrderController.changeStatus);

authRoutes.get("/admin/heros", HeroController.getHeroSection);
authRoutes.post("/admin/heros", HeroController.addHeroSection);
authRoutes.get("/admin/heros/:id", HeroController.getHeroSectionById);
authRoutes.delete("/admin/heros/:id", HeroController.removeHeroSection);
authRoutes.put("/admin/heros/:id", HeroController.updateHeroSection);

authRoutes.get("/admin/categories", CategoryController.getCategories);
authRoutes.post("/admin/categories", CategoryController.addCategory);
authRoutes.get("/admin/categories/:id", CategoryController.getCategoryById);
authRoutes.delete("/admin/categories/:id", CategoryController.removeCategory);
authRoutes.put("/admin/categories/:id", CategoryController.updateCategory);

authRoutes.get("/admin/sub-categories", SubcategoryController.getAll);
authRoutes.post("/admin/sub-categories", SubcategoryController.addSubCategory);
authRoutes.get("/admin/sub-categories/:id", SubcategoryController.getDetail);

authRoutes.get("/mealTimes", MealTimeController.getMealTimes);
authRoutes.post("/admin/mealTimes", MealTimeController.addMealTime);
authRoutes.get("/admin/mealTimes/:id", MealTimeController.getDetails);
authRoutes.delete("/admin/mealTimes/:id", MealTimeController.deleteMealTime);
authRoutes.delete(
  "/admin/sub-categories/:id",
  SubcategoryController.deleteSubcategory
);
authRoutes.put(
  "/admin/sub-categories/:id",
  SubcategoryController.updateSubCategory
);

authRoutes.get("/categories", CategoryController.getCategories);
authRoutes.get("/sub-categories", SubcategoryController.getAll);

authRoutes.delete("/users/:id", UserController.deleteUser);
authRoutes.get("/verifyToken", UserController.verifyToken);
authRoutes.get("/userOrders", OrderController.userOrders);
authRoutes.post("/order", OrderController.orderProduct);
authRoutes.post("/cancel-full-order/:id", OrderController.cancelFullOrder);
authRoutes.post("/cancel-order-item/:id", OrderController.cancelOrderItem);

authRoutes.get("/cart", CartController.getCartItems);
authRoutes.post("/cart", CartController.addToCart);
authRoutes.delete("/cart/:id", CartController.removeFromCart);
authRoutes.post("/cartAddQuantity/:id", CartController.AddQuantity);
authRoutes.post("/cartSubtractQuantity/:id", CartController.SubtractQuantity);
authRoutes.get("/userCartItems", CartController.getUserCart);
authRoutes.post("/cart-to-wishlist/:id", CartController.cartToWishlist);
authRoutes.post("/clear-cart", CartController.clearCart);

authRoutes.get("/wishlist", WishListController.getwishlists);
authRoutes.post("/wishlist", WishListController.addToWishlist);
authRoutes.delete("/wishlist/:id", WishListController.removeFromWishlist);
authRoutes.get("/userwishlist", WishListController.getUserWishlist);
authRoutes.post("/wishlist-to-cart/:id", WishListController.wishListToCArt);
authRoutes.post("/clear-wishlist", WishListController.clearWishlist);

authRoutes.get("/menu/:id/review", ProductRateingController.getProductReviews);
authRoutes.post("/menu/:id/review", ProductRateingController.addProductReview);
authRoutes.delete("/menu/:id/review", ProductRateingController.removeReview);
authRoutes.put("/menu/:id/review", ProductRateingController.updateReview);

authRoutes.get("/reported-menues", ReportProductController.getReportedMenu);

authRoutes.post("/report-menu/:id", ReportProductController.addReportedMenu);

// will be done for admin only
authRoutes.put("/report-menu/:id", ReportProductController.updateReview);

// Adimin routes

router.use(authRoutes);

export default router;
