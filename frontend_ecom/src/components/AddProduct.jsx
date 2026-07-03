 import { useState } from 'react'
import "./AddProduct.css"
import { Link } from 'react-router-dom'
export function AddProduct(){
  const[name,setName]=useState("")
  const[description,setdescription]=useState("")
  const[price,setPrice]=useState(0)
  const[img,setImg]=useState("")
const API = import.meta.env.VITE_API_URL;

  async function handleAdd() {
  
  await fetch(`${API}/products`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name:name,
    description:description,
    price:price,
    img:img,
  }),
});
  }

  return(
    <div className="add-product-container">
  <div className="add-product-form">

    <h1>Add Products</h1>
    <br/>
    <input type='text' placeholder='Enter product name' onChange={(e)=>{setName(e.target.value)}}></input>
    <br/>
    <input type='text'placeholder='Enter product description'onChange={(e)=>{setdescription(e.target.value)}}></input>
    <br/>
    <input type='number'placeholder='Enter product price'onChange={(e)=>{setPrice(e.target.value)}}></input>
    <br/>
    <input type='text'placeholder='Enter img link'onChange={(e)=>{setImg(e.target.value)}}></input>
    <br/>
    <button onClick={handleAdd}><Link to="/products">ADD</Link></button> 
    {/* <h3>{name} : {description} : {price} : {img}</h3> */}
    </div>
    </div>
  )
}
export default AddProduct;
