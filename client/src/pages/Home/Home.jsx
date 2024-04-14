import React, { useEffect, useState } from "react";
import bgVideo from "../../assests/bgVideo.mp4";
import "./Home.scss";
import axios from "axios";
import API_BASE_URL from "../../config/config";

import { FaRegCalendarAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChatBot from "../../components/ChatBot/ChatBot";
import bot from '../../assests/bot.jpeg'

const Home = () => {
  const [apodData, setApodData] = useState({});
  const [apodImages, setApodImages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    pauseOnHover: false,
  };

  useEffect(() => {
    const fetchApodData = async () => {
      const apod = await axios.post(`${API_BASE_URL}/v1/data/img/apod`);
      console.log(apod.data);
      setApodData(apod.data);
    };

    fetchApodData();

    const fetchApodImages = async () => {
      const apod = await axios.post(`${API_BASE_URL}/v1/data/img/apod`, {
        count: 10,
      });
      console.log(apod.data);
      setApodImages(apod.data);
    };

    fetchApodImages();
  }, []);

  return (
    <>
      <div className="hero_section">
        <video id="background-video" autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div class="searchbar">
          <input type="text" name="" id="search" placeholder="Search here" />
        </div>
        <h1 class="big-text text-light font-weight-bold">Astrophotographer</h1>
        <p class="small-text text-light font-weight-normal">
          Embark on a cosmic journey through captivating images. Our
          astrophotography showcases the beauty of the universe, capturing
          celestial wonders in breathtaking detail. Explore distant galaxies,
          nebulae, and star clusters through the lens of our passionate
          photographers. Let the cosmos inspire and awe you.
        </p>
      </div>
      <h1 className="heading text-light font-weight-bold">
        Some Astronomy Picture{" "}
      </h1>

      <div className="picture_slider">
        <Slider {...settings}>
          {apodImages.map((image, index) => (
            <div key={index} className="image">
              <img src={image.hdurl} alt="slideshow" />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="heading text-light font-weight-bold">
        Astronomy Picture of Day
      </h1>

      <div className="apod_Container text-light font-weight-normal">
        <img src={apodData.hdurl} alt="apod" />
        <div className="apod_info">
          <h2>{apodData.title}</h2>
          <p>{apodData.explanation}</p>
          <div className="author_info">
            <span>
              {" "}
              <FaRegCalendarAlt size={20} />
              <p>{apodData.date}</p>{" "}
            </span>
            <p>{apodData.copyright}</p>
          </div>
        </div>
      </div>

      <div className="chatBotBtn">
      <button  onClick={() => setShowChatbot(!showChatbot)}><img src = {bot} alt="bot"/></button>
      </div>
      {showChatbot && <ChatBot/>}

    
    </>
  );
};

export default Home;
