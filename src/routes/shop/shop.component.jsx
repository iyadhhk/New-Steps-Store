import { Routes, Route, Navigate } from "react-router-dom";

import Category from "../../components/category/category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index path="men" element={<Category category="men" />} />
      <Route path="women" element={<Category category="women" />} />
      <Route path="kids" element={<Category category="kids" />} />
      <Route path="*" element={<Navigate to="/shop/men" />} />
    </Routes>
  );
};

export default Shop;
