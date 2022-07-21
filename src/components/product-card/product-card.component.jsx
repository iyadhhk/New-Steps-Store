import { useState } from "react";
import { useDispatch } from "react-redux";

import { ReactComponent as Favorites } from "../../assets/heart.svg";
import { ReactComponent as RemoveIcon } from "../../assets/remove-heart.svg";
import { addItemToCart } from "../../features/cart/cart.slice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlist.slice";
import CustomButton from "../custom-button/custom-button.component";

const ProductCard = ({ product, isLiked, wishlist }) => {
  const { id, name, price, imageUrl, size } = product;
  const defaultSize = size[0];
  const dispatch = useDispatch();
  const [shoeSize, setShoeSize] = useState(defaultSize);
  const [likeProduct, setLikeProduct] = useState(isLiked);

  const onClickSize = (size) =>
    shoeSize === size ? setShoeSize(defaultSize) : setShoeSize(size);

  const onLikeProduct = () => {
    if (!likeProduct) {
      dispatch(addToWishlist(product));
    } else {
      dispatch(removeFromWishlist(id));
    }
    setLikeProduct(!likeProduct);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart({ ...product, size: shoeSize }));
  };

  return (
    <div className="flex flex-col my-4">
      <img className="h-[400px] w-[320px] " src={imageUrl} alt="" />
      <p className="text-xl font-base text-primary mt-2 flex justify-between">
        <span>{name}</span>
        <span className="cursor-pointer" onClick={onLikeProduct}>
          {wishlist ? (
            <RemoveIcon
              className={`${
                likeProduct ? "fill-red-400" : "fill-transparent"
              }  h-6 w-auto`}
            />
          ) : (
            <Favorites
              className={`${
                likeProduct ? "fill-secondary" : "fill-transparent"
              }  h-6 w-auto`}
            />
          )}
        </span>
      </p>
      <p className="text-lg font-bold text-primary my-2">${price}</p>
      <div className="flex justify-between">
        <p className="text-lg font-base text-primary">Size</p>
        <p>
          {size.map((sizeItem, idx) => (
            <span
              className={`${
                sizeItem === shoeSize
                  ? "bg-secondary text-light"
                  : "bg-gray-100 hover:bg-secondary hover:text-light"
              } py-1 px-2 ml-1 cursor-pointer `}
              key={idx}
              onClick={() => onClickSize(sizeItem)}>
              {sizeItem}
            </span>
          ))}
        </p>
      </div>
      <CustomButton onClick={addToCartHandler} variant="product">
        add to cart
      </CustomButton>
    </div>
  );
};

export default ProductCard;
