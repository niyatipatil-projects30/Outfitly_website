import "./Product.css";
import { useState, useEffect } from "react";
import { supabase } from "../database";
const staticProducts = [
  {
    id: 1,
    name: "Oversized Tea",
    price: "₹399",
    image: "src/components/Over Sized Tea.jpg",
    description: "Comfortable oversized cotton t-shirt."
  },
  {
    id: 2,
    name: "Summer Fit",
    price: "₹499",
    image: "src/components/summer fit' yumi kim'.jpg",
    description: "Stylish summer dress for casual outings."
  },
  {
    id: 3,
    name: "Polka dots mid skirt",
    price: "₹799",
    image: "src/components/mid skirt.jpg",
    description: "Simple and trendy skirt."
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: "₹999",
    image: "src/components/Demin Jaket.jpg",
    description: "Classic denim jacket."
  },
  {
    id: 5,
    name: "Red Gingham Top",
    price: "₹699",
    image: "src/components/Red Gingham Top.jpg",
    description: "Gurly Top."
  },
  {
    id: 6,
    name: "Wid Leg Pants",
    price: "₹899",
    image: "src/components/Wid led pants.jpg",
    description: "Classic denim jacket."
  }
];

export function Product() {
  const [dbProducts, setDbProducts] = useState([]);

  //read function
  async function getProducts() {
  const res = await fetch("http://localhost:5001/products");
  const data= await res.json();
  setDbProducts(data);
}
//delete function 
  async function deleteProduct(id) {
  await fetch(`http://localhost:5001/products/${id}`, {
    method: "DELETE",
  });
  getProducts();
}
//   const { error } = await supabase.from("products").delete().eq("id", id);
//   if (error) {
//     console.log(error);
//   } else {
//     getProducts(); 
//   }
// }

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