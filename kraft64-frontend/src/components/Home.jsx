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