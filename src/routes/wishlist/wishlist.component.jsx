import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";

import { selectWishListItems } from "../../features/wishlist/wishlist.slice";

const WishList = () => {
  const wishlist = useSelector(selectWishListItems);
  return (
    <div className="flex flex-col items-center">
      <h1 className="capitalize text-2xl mt-4 mb-1 text-center text-primary">
        your whishlist
      </h1>
      <p className="text-center text-gray-500">({wishlist.length} Items)</p>
      <div className="grid-cols-1 justify-items-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {wishlist &&
          wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={true}
              wishlist={true}
            />
          ))}
      </div>
    </div>
  );
};

export default WishList;
