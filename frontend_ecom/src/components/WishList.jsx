import "./WishList.css";
import Polkadotsmidskirt from"../assets/mid skirt.jpg";
import OverSizedTea from"../assets/over-sized Tea.jpg";

export function WishList() {
  const wishlistItems = [
    {
      id: 1,
      name: "mid skirt",
      price: "₹799",
      image: Polkadotsmidskirt,
    },
    {
      id: 2,
      name: "Over sized Tea",
      price: "₹299",
      image:OverSizedTea ,
    },
  ];

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p>{item.price}</p>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;