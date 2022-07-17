import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categories.service";
import {
  selectCategories,
  selectIsLoading,
  selectIsSuccess,
} from "../../features/categories/categories.slice";

import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";

const Category = ({ category }) => {
  const dispatch = useDispatch();
  const [productsList, setProductsList] = useState([]);
  const products = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && products) {
      setProductsList(products[category]);
    }
  }, [category, products, isSuccess]);

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="capitalize text-primary text-2xl my-5">{`${category} shoes`}</h1>
      <p className="text-center capitalize text-gray-500">
        check out our summer collection
      </p>
      {isLoading ? (
        <div className="mt-10">
          <Spinner fill="#3eabde" size="lg" />
        </div>
      ) : (
        <div className="grid-cols-1 justify-items-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {productsList &&
            productsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;
