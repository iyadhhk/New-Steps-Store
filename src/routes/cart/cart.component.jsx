import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeItemFromCart,
  selectCartItems,
  selectCount,
  selectTotal,
} from "../../features/cart/cart.slice";

import { ReactComponent as AddIcon } from "../../assets/add-plus.svg";
import { ReactComponent as RemoveIcon } from "../../assets/minus.svg";
import { ReactComponent as ClearIcon } from "../../assets/remove.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const count = useSelector(selectCount);
  const total = useSelector(selectTotal);

  const onRemoveFromCartHandler = (data) => {
    dispatch(removeItemFromCart(data));
  };
  const onAddToCartHandler = () => {};
  const onClearHandler = () => {};

  return (
    <div className="flex flex-col items-center">
      <h1 className="capitalize text-2xl mt-4 mb-1 text-center text-primary">
        your shopping bag
      </h1>
      <p className="text-center text-gray-500">({count} Items)</p>
      <div className="container max-w-3xl border-2">
        {cartItems &&
          cartItems.map((cartItem) => (
            <div
              className="flex flex-row items-center w-full mt-4 border-b"
              key={cartItem.id}>
              <img className="h-[150px]" src={cartItem.imageUrl} alt="" />
              <div className="flex flex-col flex-1">
                <div className="flex justify-between border-2 w-full">
                  <p>{cartItem.name}</p>
                  <p>${cartItem.price}</p>
                </div>

                <div className="flex flex-row justify-between items-center flex-1">
                  <div className="flex flex-col flex-1">
                    {cartItem.itemSizes.map((itemSize, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-2 px-4 ">
                        <span>Size</span>
                        <span>{itemSize}</span>
                        <span>
                          <RemoveIcon
                            onClick={() =>
                              onRemoveFromCartHandler({
                                id: cartItem.id,
                                size: itemSize,
                                price: cartItem.price,
                              })
                            }
                            className="fill-red-400 h-5 cursor-pointer"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                  <span
                    className="cursor-pointer m-2"
                    onClick={() => onClearHandler(cartItem.id)}>
                    <ClearIcon className="fill-red-400 h-5 cursor-pointer" />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <p>Total: {total}$</p>
      {/* <PaymentForm /> */}
    </div>
  );
};

export default Cart;
