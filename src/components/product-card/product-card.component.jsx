import { useState } from "react";

import { ReactComponent as Favorites } from "../../assets/heart.svg";
import CustomButton from "../custom-button/custom-button.component";

const ProductCard = ({ product }) => {
  const [shoeSize, setShoeSize] = useState(0);
  const [likeProduct, setLikeProduct] = useState(false);

  const { name, price, imageUrl, size } = product;

  const onClickSize = (size) => (shoeSize === size ? setShoeSize(0) : setShoeSize(size));

  const onLikeProduct = () => {
    if (!likeProduct) {
      console.log("product liked");
    } else {
      console.log("product unliked");
    }
    setLikeProduct(!likeProduct);
  };

  const addToCartHandler = () => {
    if (shoeSize) {
      console.log("added to cart");
      setShoeSize(0);
    } else {
      alert("choose size");
    }
  };

  return (
    <div className="flex flex-col my-4">
      <img className="h-[400px] w-[320px] " src={imageUrl} alt="" />
      <p className="text-xl font-base text-primary mt-2 flex justify-between">
        <span>{name}</span>
        <span className="cursor-pointer" onClick={onLikeProduct}>
          <Favorites
            className={`${
              likeProduct ? "fill-secondary" : "fill-transparent"
            }  h-6 w-auto`}
          />
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
