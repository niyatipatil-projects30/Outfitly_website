import "./HeroSection.css";
import { useNavigate } from 'react-router-dom';
import HeroImg from '../assets/HeroImg.jpg';
export function HeroSection() {
  
  return (
    <div
  className="hero"
  style={{ backgroundImage: `url(${HeroImg})` }}
>
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