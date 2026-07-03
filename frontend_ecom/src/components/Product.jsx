import "./Product.css";
import { useState, useEffect } from "react";
import { supabase } from "../database";
import OverSizedTea from "../assets/over-sized Tea.jpg";
import SummerFit from"../assets/summer fit' yumi kim'.jpg";
import Polkadotsmidskirt from"../assets/mid skirt.jpg";
import DenimJacket from "../assets/Demin Jaket.jpg";
import RedGinghamTop from "../assets/Red Gingham Top.jpg"
import WidLegPants from"../assets/Wid led pants.jpg";

const staticProducts = [
   { id: 1, name: "Oversized Tea",
     price: "₹399",
      image: OverSizedTea, 
      description: "Comfortable oversized cotton t-shirt."
   },
  {
    id: 2,
    name: "Summer Fit",
    price: "₹499",
    image: SummerFit,
    description: "Stylish summer dress for casual outings."
  },
  {
    id: 3,
    name: "Polka dots mid skirt",
    price: "₹799",
    image:Polkadotsmidskirt ,
    description: "Simple and trendy skirt."
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: "₹999",
    image:DenimJacket ,
    description: "Classic denim jacket."
  },
  {
    id: 5,
    name: "Red Gingham Top",
    price: "₹699",
    image: RedGinghamTop ,
    description: "Gurly Top."
  },
  {
    id: 6,
    name: "Wid Leg Pants",
    price: "₹899",
    image:  WidLegPants,
    description: "Classic denim jacket."
  }
];

export function Product() {
  const [dbProducts, setDbProducts] = useState([]);
const API = import.meta.env.VITE_API_URL;
  //read function
  async function getProducts() {
  const res = await fetch(`${API}/products`);
  const data= await res.json();
  setDbProducts(data);
}
//delete function 
  async function deleteProduct(id) {
  await fetch(`${API}/products/${id}`, {
    method: "DELETE",
  });
  getProducts();
}

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="products-page">
        <h1>Our Products</h1>

        <div className="products-grid">

          {/* Existing Products */}
          {staticProducts.map((product) => (
            <div className="product-detail-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <h3>{product.price}</h3>

              <p>{product.description}</p>

              <button>Add To Cart</button>
              <br/><br/>
              <button onClick={()=>deleteProduct(product.id)}>DELETE</button>
            </div>
          ))}
          {dbProducts.map((product) => (
            <div className="product-detail-card" key={product.id}>
              <img
                src={product.img}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <h3>₹{product.price}</h3>

              <p>{product.description}</p>

              <button>Add To Cart</button>
              <br/><br/>

            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Product;