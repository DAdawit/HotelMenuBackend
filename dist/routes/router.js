"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const CartController_1 = __importDefault(require("../controller/CartController"));
const MenuController_1 = __importDefault(require("../controller/MenuController"));
const OrderController_1 = __importDefault(require("../controller/OrderController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
const SubCategoryController_1 = __importDefault(require("../controller/SubCategoryController"));
const WishListController_1 = __importDefault(require("../controller/WishListController"));
const ProductReviewsController_1 = __importDefault(require("../controller/ProductReviewsController"));
const ReportProductController_1 = __importDefault(require("../controller/ReportProductController"));
const AdminController_1 = __importDefault(require("../controller/AdminController"));
const MealTimeController_1 = __importDefault(require("../controller/MealTimeController"));
const HeroController_1 = __importDefault(require("../controller/HeroController"));
const LogoController_1 = __importDefault(require("../controller/LogoController"));
const router = (0, express_1.Router)();
// Routes that do not require authentication
router.post("/login", UserController_1.default.LoginUser);
router.get("/users", UserController_1.default.getUsers);
router.post("/users", UserController_1.default.addUser);
router.put("/change-profile-pic/:id", UserController_1.default.updateProfilePic);
router.get("/heros", HeroController_1.default.getHeroSection);
router.get("/all-heros", HeroController_1.default.getAllHeroSection);
router.get("/logos", LogoController_1.default.getLogos);
router.get("/menus", MenuController_1.default.get);
router.get("/menus", MealTimeController_1.default.getMealTimes);
router.get("/menus/menusbyCategory", MenuController_1.default.menuesByCategory);
router.get("/menus/mealtime/:id", MenuController_1.default.fetchMenuesByMealTime);
router.get("/menus/category/:id", MenuController_1.default.fetchMenuesByCategory);
router.get("/menus/subCategory/:id", MenuController_1.default.featchMenuBySubCategory);
router.get("/menus/special-foods", MenuController_1.default.fetchSpecialFoodsMenus);
router.get("/search", MenuController_1.default.SearchMenus);
router.get("/menus/all-special-foods", MenuController_1.default.fetchAllSpecialFoodsMenus);
router.get("/menus/main-dishes", MenuController_1.default.fetchMainDishes);
router.get("/menus/all-main-dishes", MenuController_1.default.fetchAllMainDishes);
router.get("/mealTime/:id", MealTimeController_1.default.getDetails);
router.get("/categories/:id", CategoryController_1.default.getCategoryById);
router.get("/category/:id", CategoryController_1.default.categoryById);
router.get("/sub-category/:id", SubCategoryController_1.default.getDetail);
router.get("/menus/mealtimes", MenuController_1.default.menuesByMealTime);
router.get("/menus/subcategories", MenuController_1.default.menuesBySubCategory);
router.get("/products/related/:id", MenuController_1.default.relatedProducts);
router.get("/products/:id", MenuController_1.default.detail);
router.get("/categories", CategoryController_1.default.getCategories);
router.get("/sub-categories", SubCategoryController_1.default.getAll);
router.get("/mealTimes", MealTimeController_1.default.getMealTimes);
// Group routes that require authentication
const authRoutes = (0, express_1.Router)();
authRoutes.use(authMiddleware_1.default);
authRoutes.get("/admin/users", AdminController_1.default.getUsers);
authRoutes.put("/admin/users/:id/activate", AdminController_1.default.activateUser);
authRoutes.put("/admin/users/:id/deactive", AdminController_1.default.deActivateUser);
authRoutes.get("/admin/reporeted-products", AdminController_1.default.getReportedProducts);
authRoutes.get("/admin/menus", MenuController_1.default.get);
authRoutes.post("/admin/add-menu", MenuController_1.default.add);
authRoutes.get("/admin/menus/:id", MenuController_1.default.detail);
authRoutes.put("/admin/add-menuImage/:id", MenuController_1.default.addOrChangeMenuImage);
authRoutes.put("/admin/menu/:id", MenuController_1.default.updateMenu);
authRoutes.put("/admin/order/:id/change-status", OrderController_1.default.changeStatus);
authRoutes.get("/admin/heros", HeroController_1.default.AdminHeroSection);
authRoutes.post("/admin/heros", HeroController_1.default.addHeroSection);
authRoutes.get("/admin/heros/:id", HeroController_1.default.getHeroSectionById);
authRoutes.delete("/admin/heros/:id", HeroController_1.default.removeHeroSection);
authRoutes.put("/admin/heros/:id", HeroController_1.default.updateHeroSection);
authRoutes.get("/admin/logos", LogoController_1.default.AdmingetLogos);
authRoutes.post("/admin/logos", LogoController_1.default.addLogo);
authRoutes.get("/admin/logos/:id", LogoController_1.default.getLogoById);
authRoutes.delete("/admin/logos/:id", LogoController_1.default.removeLogo);
authRoutes.put("/admin/logos/:id", LogoController_1.default.updateLogo);
authRoutes.get("/admin/allCategories", CategoryController_1.default.getCategories);
authRoutes.get("/admin/categories", CategoryController_1.default.AdmingetCategories);
authRoutes.get("/admin/categories-with-subcategories", CategoryController_1.default.getCategorieswithSubcategories);
authRoutes.post("/admin/categories", CategoryController_1.default.addCategory);
authRoutes.get("/admin/categories/:id", CategoryController_1.default.getCategoryById);
authRoutes.delete("/admin/categories/:id", CategoryController_1.default.removeCategory);
authRoutes.put("/admin/categories/:id", CategoryController_1.default.updateCategory);
authRoutes.get("/admin/all-sub-categories", SubCategoryController_1.default.getAll);
authRoutes.get("/admin/sub-categories", SubCategoryController_1.default.AdmingetSubCategories);
authRoutes.post("/admin/sub-categories", SubCategoryController_1.default.addSubCategory);
authRoutes.get("/admin/sub-categories/:id", SubCategoryController_1.default.getDetail);
authRoutes.get("/admin/mealTimes", MealTimeController_1.default.getMealTimes);
authRoutes.post("/admin/mealTimes", MealTimeController_1.default.addMealTime);
authRoutes.get("/admin/mealTimes/:id", MealTimeController_1.default.getDetails);
authRoutes.put("/admin/mealTimes/:id", MealTimeController_1.default.updateMealTime);
authRoutes.delete("/admin/mealTimes/:id", MealTimeController_1.default.deleteMealTime);
authRoutes.delete("/admin/sub-categories/:id", SubCategoryController_1.default.deleteSubcategory);
authRoutes.put("/admin/sub-categories/:id", SubCategoryController_1.default.updateSubCategory);
authRoutes.get("/categories", CategoryController_1.default.getCategories);
authRoutes.get("/sub-categories", SubCategoryController_1.default.getAll);
authRoutes.delete("/users/:id", UserController_1.default.deleteUser);
authRoutes.post("/verifyToken", UserController_1.default.verifyToken);
authRoutes.get("/userOrders", OrderController_1.default.userOrders);
authRoutes.post("/order", OrderController_1.default.orderProduct);
authRoutes.post("/cancel-full-order/:id", OrderController_1.default.cancelFullOrder);
authRoutes.post("/cancel-order-item/:id", OrderController_1.default.cancelOrderItem);
authRoutes.get("/cart", CartController_1.default.getCartItems);
authRoutes.post("/cart", CartController_1.default.addToCart);
authRoutes.delete("/cart/:id", CartController_1.default.removeFromCart);
authRoutes.post("/cartAddQuantity/:id", CartController_1.default.AddQuantity);
authRoutes.post("/cartSubtractQuantity/:id", CartController_1.default.SubtractQuantity);
authRoutes.get("/userCartItems", CartController_1.default.getUserCart);
authRoutes.post("/cart-to-wishlist/:id", CartController_1.default.cartToWishlist);
authRoutes.post("/clear-cart", CartController_1.default.clearCart);
authRoutes.get("/wishlist", WishListController_1.default.getwishlists);
authRoutes.post("/wishlist", WishListController_1.default.addToWishlist);
authRoutes.delete("/wishlist/:id", WishListController_1.default.removeFromWishlist);
authRoutes.get("/userwishlist", WishListController_1.default.getUserWishlist);
authRoutes.post("/wishlist-to-cart/:id", WishListController_1.default.wishListToCArt);
authRoutes.post("/clear-wishlist", WishListController_1.default.clearWishlist);
authRoutes.get("/menu/:id/review", ProductReviewsController_1.default.getProductReviews);
authRoutes.post("/menu/:id/review", ProductReviewsController_1.default.addProductReview);
authRoutes.delete("/menu/:id/review", ProductReviewsController_1.default.removeReview);
authRoutes.put("/menu/:id/review", ProductReviewsController_1.default.updateReview);
authRoutes.get("/reported-menues", ReportProductController_1.default.getReportedMenu);
authRoutes.post("/report-menu/:id", ReportProductController_1.default.addReportedMenu);
// will be done for admin only
authRoutes.put("/report-menu/:id", ReportProductController_1.default.updateReview);
// Adimin routes
router.use(authRoutes);
exports.default = router;
