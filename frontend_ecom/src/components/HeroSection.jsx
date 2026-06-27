import "./HeroSection.css";
import { useNavigate } from 'react-router-dom';
export function HeroSection() {
  // const navigate = useNavigate();

  // const handleShopNowClick = () => {
  //   if (session) {
  //     // User is logged in, take them straight to your main ecommerce shop page
  //     navigate('/shop');
  //   } else {
  //     // User is new, redirect to the Sign Up component
  //     navigate('/signup');

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Trendy Collection</h1>
        <br/>
        <br/>
        <p>Discover trendy outfits and accessories at amazing prices.</p>
         <button 
       >
        Shop Now
      </button>
      </div>
    </div>
  );
}
export default HeroSection;