import express from "express";
import cors from "cors";
import {supabase} from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

 app.post("/products", async (req, res) => {
  console.log("Request body:", req.body);
  const { name, description, price, img } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        price,
        img,
      },
    ]);

  if (error) {
  console.error("Insert Error:", error);
  return res.status(500).json(error);
}

  res.json(data);
});

console.log("Product list!!")

app.get("/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

     if (error) {
    return res.status(500).json(error);
  }
  res.json(data);

});
 app.delete("/products/:id",async(req,res)=>{
     const id = req.params.id
     const {error}=await supabase.from("products").delete().eq("id",id)
     if (error){
        return res.status(500).json(error)
     }
     res.json("product deleted")
 })


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});