import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/auth/authentication.component";
import Cart from "./routes/cart/cart.component";
import WishList from "./routes/wishlist/wishlist.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
