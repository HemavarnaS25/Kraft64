import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="container text-center home-content">
        <h1 id="typed">
          <Typewriter
            words={['Welcome to Kraft64!']}
            loop={1}
            cursor={true} 
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <motion.p 
          className="lead"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Celebrating the Timeless Beauty of Tamil 64 Arts 
        </motion.p>
        {/* <motion.div 
          className="home-gallery"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Carousel indicators={false} controls={false} interval={2500} fade>
            <Carousel.Item>
              <div className="card-carousel">
                <img src="https://i0.wp.com/ebhubaneswar.com/wp-content/uploads/2021/04/Untitled-design-64.jpg?ssl=1" alt="Tradition 1" className="gallery-img" />
                <div className="overlay">
                  <h5>Classical Dance</h5>
                  <p>Grace of Bharatanatyam</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card-carousel">
                <img src="https://www.events.unsw.edu.au/sites/default/files/styles/og_facebook_image/public/2021-09/Sing%20With%20Us%20Indian%20Classical%20Music%20Hero%20IMage.jpg?itok=wEz6xTxb" alt="Tradition 2" className="gallery-img" />
                <div className="overlay">
                  <h5>Ancient Music</h5>
                  <p>Veenai Melodies</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card-carousel">
                <img src="https://c8.alamy.com/comp/2R6KEWB/paintings-murals-frescos-in-chitra-sabha-one-of-five-major-nataraja-temples-in-courtalam-kutralam-kuttalam-tamil-nadu-south-india-india-asia-2R6KEWB.jpg" alt="Tradition 3" className="gallery-img" />
                <div className="overlay">
                  <h5>Temple Art</h5>
                  <p>Kutralam Natural Painting</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </motion.div> */}
        <motion.a 
          href="#about" 
          className="scroll-down-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=WQiX8VTC7LIa&format=png&color=000000" 
            alt="Scroll Down Icon" 
            style={{ width: '45px', height: '40px' }} 
          />
        </motion.a>

      </div>
    </section>
  );
};

export default Home;
