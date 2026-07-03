import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Cart } from "./components/Cart";
import { About } from "./components/About";
import { WishList } from "./components/WishList";
import { Contact } from "./components/Contact";
import { AddProduct } from "./components/AddProduct";
import { SignUp } from './components/SignUp';
import { Login } from "./components/Login";
import { supabase } from "./database";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Scanner from './pages/Scanner';

export function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
      
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Your Store...</div>;
  }

  return (
      <div>
        <Navbar session={session} />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Outfitly</h1>
        
        <Routes>
          <Route path="/"element={<Home/>}/>
          <Route path="/login"element={<Login/>}/>
          <Route path="/" element={!session ? <SignUp /> : <Navigate to="/home" />} />
         
          {/* Authentication Routes */}
          <Route path="/signup" element={!session ? <SignUp /> : <Navigate to="/AddProduct" />} />
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/AddProduct" />} />

          {/* CHANGE 2: Your old landing page/Hero section is now moved to its own distinct URL path */}
          <Route path="/home" element={<Home session={session} />} />

          {/* Protected Shopping/Dashboard Pages */}
         <Route path="/products" element={<Product/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>


          {/* Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scanner" element={<Scanner />} />
        </Routes>
      </div>
    
  );
}

export default App;
