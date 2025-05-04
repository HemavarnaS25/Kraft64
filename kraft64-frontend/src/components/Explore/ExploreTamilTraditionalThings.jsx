// src/components/Explore/ExploreTamilTraditionalThings.jsx
import React, { useState } from 'react';

// Example list of Tamil Traditional Things
const traditionalThingsList = [
  {
    name: 'Kolam',
    description: 'Rangoli designs made using rice flour and colors.',
    image: 'images/traditional_things/1.JPG',
  },
  {
    name: 'Traditional Jewelry',
    description: 'Handcrafted jewelry in Tamil culture.',
    image: 'images/traditional_things/2.jpg',
  },
  {
    name: 'Tanjore Painting',
    description: 'A traditional South Indian painting style.',
    image: 'images/traditional_things/3.webp',
  },
  {
    name: 'Silk Saree',
    description: 'Traditional silk sarees, particularly from Kanchipuram.',
    image: 'images/traditional_things/4.webp',
  },
  {
    name: 'Puja Thali',
    description: 'A platter used for Hindu religious rituals.',
    image: 'images/traditional_things/5.jpeg',
  },
  {
    name: 'Mridangam',
    description: 'A traditional South Indian percussion instrument used in Carnatic music.',
    image: 'images/traditional_things/6.avif',
  },
  {
    name: 'Villu Paatu',
    description: 'A traditional Tamil folk art form involving storytelling through music and dance.',
    image: 'images/traditional_things/7.jpg',
  },
  {
    name: 'Kuthu Vilakku',
    description: 'Traditional oil lamps made of metal, commonly used during religious ceremonies.',
    image: 'images/traditional_things/8.jpeg',
  },
  {
    name: 'Tanjore Dolls',
    description: 'Traditional handmade dolls made from clay, often used for decoration during festivals.',
    image: 'images/traditional_things/9.jpeg',
  },
  {
    name: 'Pongal Pot',
    description: 'A special clay pot used for cooking the traditional Tamil festival dish, Pongal.',
    image: 'images/traditional_things/10.jpg',
  },
];

const ExploreTamilTraditionalThings = () => {
  const [selectedThing, setSelectedThing] = useState(null);

  const handleCardClick = (thing) => {
    setSelectedThing(thing);
  };

  return (
    <section className="explore-tamil-traditional-things">
      <h2>Tamil Traditional Things</h2>
      <div className="traditional-things-gallery">
        {traditionalThingsList.map((thing, index) => (
          <div key={index} className="traditional-things-card" onClick={() => handleCardClick(thing)}>
            <img src={thing.image} alt={thing.name} className="card-image" />
            <h3>{thing.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal to show selected traditional thing details */}
      {selectedThing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedThing.name}</h2>
            <img src={selectedThing.image} alt={selectedThing.name} className="modal-image" />
            <p>{selectedThing.description}</p>
            <button onClick={() => setSelectedThing(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreTamilTraditionalThings;
