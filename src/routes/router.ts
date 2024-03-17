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
const router = Router();

// Routes that do not require authentication
router.post("/login", UserController.LoginUser);
router.get("/users", UserController.getUsers);
router.post("/users", UserController.addUser);
router.put("/change-profile-pic/:id", UserController.updateProfilePic);

router.get("/products", MenuController.get);
// router.get("/products2", ProductController.getPaginatedProducts);
// router.get("/products/new-arrivals", ProductController.newArrivales);
// router.get("/products/featured", ProductController.featuredProducts);
router.get("/products/related/:id", MenuController.relatedProducts);
router.get("/products/:id", MenuController.detail);
router.get("/products/category/:id", MenuController.featchMenuesByCategory);
router.get("/products/subCategory/:id", MenuController.featchMenuBySubCategory);

router.delete("/store/product/:id", MenuController.delete);

// Group routes that require authentication
const authRoutes = Router();
authRoutes.use(authMiddleware);

router.get("/categories", CategoryController.getCategories);
router.get("/sub-categories", SubcategoryController.getAll);

authRoutes.post("/store/add-product", MenuController.add);
authRoutes.put("/store/product/:id", MenuController.updateProduct);
// authRoutes.get("/store/product/:id", ProductController.updateProduct);
authRoutes.put("/store/order/:id/change-status", OrderController.changeStatus);
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

authRoutes.get("/admin/users", AdminController.getUsers);
authRoutes.put("/admin/users/:id/activate", AdminController.activateUser);
authRoutes.put("/admin/users/:id/deactive", AdminController.deActivateUser);
authRoutes.get("/admin/stores", AdminController.getStores);
authRoutes.put("/admin/stores/:id/activate", AdminController.activateStore);
authRoutes.put("/admin/stores/:id/deactive", AdminController.deActivateStore);
authRoutes.get(
  "/admin/reporeted-products",
  AdminController.getReportedProducts
);

router.get("/admin/categories", CategoryController.getCategories);
router.post("/admin/categories", CategoryController.addCategory);
router.get("/admin/categories/:id", CategoryController.getCategoryById);
router.delete("/admin/categories/:id", CategoryController.removeCategory);
router.put("/admin/categories/:id", CategoryController.updateCategory);

router.get("/admin/sub-categories", SubcategoryController.getAll);
router.post("/admin/sub-categories", SubcategoryController.addSubCategory);
router.get("/admin/sub-categories/:id", SubcategoryController.getDetail);
router.delete(
  "/admin/sub-categories/:id",
  SubcategoryController.deleteSubcategory
);
router.put(
  "/admin/sub-categories/:id",
  SubcategoryController.updateSubCategory
);

router.use(authRoutes);

export default router;
