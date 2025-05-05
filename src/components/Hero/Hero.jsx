// ------------ CSS ----------------
import "./Hero.css";
// ------------ React Router Dom ----------------
import { Link } from "react-router-dom";
// ------------ Components ----------------
import Slider from "../Slider/Slider";
// ------------ SVG ----------------
import heroShape from "../../assets/header-shape.svg";
// ------------ Data ----------------
import { heroContent } from "../../data/data";

const Hero = () => {
  return (
    <section className="hero" role='banner'>

      {/*----------    Hero Shape   ----------*/}
      <img className="hero-shape" src={heroShape} alt="hero shape" />
      <Slider>

        {heroContent.map(({image,text},index) => (
        <div key={index} className="header-content">

          {/*----------    Left Part   ----------*/}
          <div>
            <h1 className="hero-title">{text}</h1>
            <Link className="btn btn-border" to="/">
              learn more
            </Link>
          </div>

          {/*----------    Right Part   ----------*/}
          <img src={image} className="hero-image" alt="hero image" />
        </div>
      ))}
      </Slider>
    </section>

  );
};

export default Hero;