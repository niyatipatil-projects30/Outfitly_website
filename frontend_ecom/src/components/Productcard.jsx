import React from "react";
import "./Productcard.css";

const products = [
  {
    id: 1,
    name: "Over-sized Tea",
    price: "₹299",
    image: "src/components/over-sized Tea.jpg",
  },
  {
    id: 2,
    name: "Yumi-Kim, Summer-Fit",
    price: "₹599",
    image: "src/components/summer fit' yumi kim'.jpg",
  },
  {
    id: 3,
    name: "Tan Top",
    price: "₹250",
    image: "src/components/TanTop.jpg",
  },
  {
    id: 4,
    name: "Blue Shirt",
    price: "₹599",
    image: "src/components/blue shirt.jpg",
  },
  {
    id: 5,
    name: "Beige Jaket",
    price: "₹899",
    image: "src/components/Beige Jaket.jpg",
  },
  {
    id: 6,
    name: "Baggy Jeans",
    price: "₹399",
    image: "src/components/Baggy Jeans.jpg",
  },
];

export function Productcard() {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Productcard;