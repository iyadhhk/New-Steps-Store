import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCartItems,
  selectCount,
  selectTotal,
} from "../../features/cart/cart.slice";

import { ReactComponent as AddIcon } from "../../assets/add-plus.svg";
import { ReactComponent as RemoveIcon } from "../../assets/minus.svg";
import { ReactComponent as ClearIcon } from "../../assets/remove.svg";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const count = useSelector(selectCount);
  const total = useSelector(selectTotal);

  const onRemoveFromCartHandler = () => {};
  const onAddToCartHandler = () => {};
  const onClearHandler = () => {};

  return (
    <div className="container">
      <h1 className="capitalize text-2xl mt-4 mb-1 text-center text-primary">
        your shopping bag
      </h1>
      <p className="text-center text-gray-500">({count} Items)</p>
      {cartItems &&
        cartItems.map((cartItem) => (
          <div className="flex flex-col items-center mt-4" key={cartItem.id}>
            <img className="h-[300px]" src={cartItem.imageUrl} alt="" />
            <div
              className="flex flex-row 
              ">
              <p>{cartItem.name}</p>
              <div className="flex flex-row items-center">
                <span
                  className="m-2 cursor-pointer"
                  onClick={() => onRemoveFromCartHandler(cartItem.id)}>
                  <RemoveIcon className="fill-primary h-5" />
                </span>
                <span className="text-primary font-semibold text-lg inline-block w-6 text-center">
                  {cartItem.quantity}
                </span>
                <span
                  className="m-2 cursor-pointer"
                  onClick={() => onAddToCartHandler(cartItem)}>
                  <AddIcon className="fill-primary h-5" />
                </span>
              </div>
            </div>
            <span
              className="cursor-pointer m-2"
              onClick={() => onClearHandler(cartItem.id)}>
              <ClearIcon className="fill-primary h-5" />
            </span>
            <p>${cartItem.price}</p>
          </div>
        ))}
      <p>Total: {total}$</p>
      {/* <PaymentForm /> */}
    </div>
  );
};

export default Cart;
