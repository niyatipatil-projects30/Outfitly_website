import React from "react";
import "./Productcard.css";
import Over_sized_Tea from "../assets/Over Sized Tea.jpg";
import Yumi_Kim_Summer_Fit from"../assets/summer fit' yumi kim'.jpg";
import Tan_Top from"../assets/TanTop.jpg";
import BlueShirt from"../assets/blue shirt.jpg";
import BeigeJaket from "../assets/Beige Jaket.jpg";
import Baggy_Jeans from "../assets/Baggy Jeans.jpg";

const products = [
  {
    id: 1,
    name: "Over-sized Tea",
    price: "₹299",
    image:Over_sized_Tea  ,
  },
  {
    id: 2,
    name: "Yumi-Kim, Summer-Fit",
    price: "₹599",
    image:Yumi_Kim_Summer_Fit ,
  },
  {
    id: 3,
    name: "Tan Top",
    price: "₹250",
    image:Tan_Top ,
  },
  {
    id: 4,
    name: "Blue Shirt",
    price: "₹599",
    image:BlueShirt,
  },
  {
    id: 5,
    name: "Beige Jaket",
    price: "₹899",
    image: BeigeJaket,
  },
  {
    id: 6,
    name: "Baggy Jeans",
    price: "₹399",
    image:Baggy_Jeans,
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