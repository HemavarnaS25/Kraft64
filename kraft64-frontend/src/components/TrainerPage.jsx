// src/components/TrainerPage.jsx
import React, { useState } from 'react';

const trainers = [
    { id: 'C001', name: 'Guru Aarthi', place: 'Madurai', mode: 'Online', contact: '9876543210', email: 'guru.aarthi@example.com', experience: '10 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C002', name: 'Sculptor Ravi', place: 'Kumbakonam', mode: 'Offline', contact: '9845612345', email: 'ravi.sculptor@example.com', experience: '15 years', course: 'Temple Sculpture', category: 'Sulpture' },
    { id: 'C003', name: 'Artist Meena', place: 'Chennai', mode: 'Online', contact: '9751245786', email: 'meena.artist@example.com', experience: '8 years', course: 'Painting in Tamil', category: 'Painting in Tamil' },
    { id: 'C004', name: 'Prof. Anbu', place: 'Coimbatore', mode: 'Offline', contact: '9123456789', email: 'anbu.tamil@example.com', experience: '20 years', course: 'Tamil Literature', category: 'Tamil language learning' },
    { id: 'C005', name: 'Potter Ramu', place: 'Salem', mode: 'Offline', contact: '9001234567', email: 'ramu.pottery@example.com', experience: '12 years', course: 'Traditional Pottery', category: 'Pottery' },
    { id: 'C006', name: 'Guru Shalini', place: 'Trichy', mode: 'Online', contact: '9012345678', email: 'shalini.bharatanatyam@example.com', experience: '9 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C007', name: 'Tanjore Gopi', place: 'Tanjore', mode: 'Offline', contact: '9123456790', email: 'gopi.tanjore@example.com', experience: '18 years', course: 'Tanjore Painting', category: 'Tanjore painting' },
    { id: 'C008', name: 'Vidya Rajan', place: 'Theni', mode: 'Online', contact: '9012341234', email: 'vidya.rajan@example.com', experience: '7 years', course: 'Tamil Grammar', category: 'Tamil language learning' },
    { id: 'C009', name: 'Karthik Sculptor', place: 'Mahabalipuram', mode: 'Offline', contact: '9876567890', email: 'karthik.sculpt@example.com', experience: '13 years', course: 'Stone Carving', category: 'Sulpture' },
    { id: 'C010', name: 'Guru Lakshmi', place: 'Erode', mode: 'Online', contact: '9988776655', email: 'lakshmi.bharat@example.com', experience: '11 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
  
    { id: 'C011', name: 'Artist Sundar', place: 'Chidambaram', mode: 'Offline', contact: '9000000001', email: 'sundar.painting@example.com', experience: '14 years', course: 'Folk Painting', category: 'Painting in Tamil' },
    { id: 'C012', name: 'Priya Dolls', place: 'Thanjavur', mode: 'Online', contact: '9333333333', email: 'priya.dolls@example.com', experience: '6 years', course: 'Tanjore Dolls', category: 'Tanjore dolls' },
    { id: 'C013', name: 'Guru Nandhini', place: 'Tirunelveli', mode: 'Offline', contact: '9444444444', email: 'nandhini.bharat@example.com', experience: '10 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C014', name: 'Potter Siva', place: 'Karur', mode: 'Online', contact: '9555555555', email: 'siva.pottery@example.com', experience: '16 years', course: 'Clay Pottery', category: 'Pottery' },
    { id: 'C015', name: 'Prof. Elango', place: 'Namakkal', mode: 'Online', contact: '9666666666', email: 'elango.tamil@example.com', experience: '22 years', course: 'Sangam Tamil', category: 'Tamil language learning' },
    { id: 'C016', name: 'Painter Kala', place: 'Cuddalore', mode: 'Offline', contact: '9777777777', email: 'kala.paint@example.com', experience: '9 years', course: 'Traditional Tamil Painting', category: 'Painting in Tamil' },
    { id: 'C017', name: 'Guru Divya', place: 'Dindigul', mode: 'Offline', contact: '9888888888', email: 'divya.bharat@example.com', experience: '8 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C018', name: 'Master Arjun', place: 'Ramanathapuram', mode: 'Online', contact: '9999999999', email: 'arjun.sculpt@example.com', experience: '17 years', course: 'Bronze Sculpture', category: 'Sulpture' },
    { id: 'C019', name: 'Poet Gayathri', place: 'Viluppuram', mode: 'Offline', contact: '9001112233', email: 'gayathri.poet@example.com', experience: '19 years', course: 'Tamil Poetry', category: 'Tamil language learning' },
    { id: 'C020', name: 'Potter Murugan', place: 'Pudukottai', mode: 'Offline', contact: '9888111222', email: 'murugan.pot@example.com', experience: '10 years', course: 'Earthen Pottery', category: 'Pottery' },
  
    { id: 'C021', name: 'Guru Renuka', place: 'Ariyalur', mode: 'Online', contact: '9877123456', email: 'renuka.bharat@example.com', experience: '9 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C022', name: 'Artist Pradeep', place: 'Sivaganga', mode: 'Offline', contact: '9765432109', email: 'pradeep.paint@example.com', experience: '11 years', course: 'Mural Painting', category: 'Painting in Tamil' },
    { id: 'C023', name: 'Sculptor Deepak', place: 'Nagapattinam', mode: 'Offline', contact: '9654321098', email: 'deepak.sculpt@example.com', experience: '13 years', course: 'Metal Sculpting', category: 'Sulpture' },
    { id: 'C024', name: 'Linguist Geetha', place: 'Perambalur', mode: 'Online', contact: '9543210987', email: 'geetha.language@example.com', experience: '15 years', course: 'Tamil Phonetics', category: 'Tamil language learning' },
    { id: 'C025', name: 'Tanjore Preetha', place: 'Mayiladuthurai', mode: 'Offline', contact: '9432109876', email: 'preetha.tanjore@example.com', experience: '12 years', course: 'Tanjore Painting', category: 'Tanjore painting' },
    { id: 'C026', name: 'Guru Manikandan', place: 'Thiruvannamalai', mode: 'Online', contact: '9321098765', email: 'manikandan.bharat@example.com', experience: '14 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C027', name: 'Clay Artist Uma', place: 'Nilgiris', mode: 'Offline', contact: '9210987654', email: 'uma.clay@example.com', experience: '6 years', course: 'Pot Making', category: 'Pottery' },
    { id: 'C028', name: 'Poet Arun', place: 'Thoothukudi', mode: 'Online', contact: '9109876543', email: 'arun.poet@example.com', experience: '10 years', course: 'Modern Tamil Poetry', category: 'Tamil language learning' },
    { id: 'C029', name: 'Guru Sneha', place: 'Vellore', mode: 'Offline', contact: '9098765432', email: 'sneha.bharatanatyam@example.com', experience: '11 years', course: 'Bharatanatyam', category: 'Bharatanatyam' },
    { id: 'C030', name: 'Doll Maker Leela', place: 'Nagari', mode: 'Online', contact: '9087654321', email: 'leela.dolls@example.com', experience: '7 years', course: 'Tanjore Dolls', category: 'Tanjore dolls' },
  ];
  

const categories = [
  'Bharatanatyam',
  'Painting in Tamil',
  'Tamil language learning',
  'Sulpture',
  'Pottery',
  'Tanjore painting',
  'Tanjore dolls',
  'Other'
];

const TrainerPage = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(trainers);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    let results = trainers.filter((t) =>
      (t.name + t.place + t.course + t.category)
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (selectedCategory) {
      results = results.filter(t => t.category === selectedCategory);
    }

    setFiltered(results);
  };

  return (
    <div className="trainer-page">
      <div className="banner">
        
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, place or course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {filtered.map((t) => (
          <div className="trainer-card" key={t.id}>
            <h3>{t.name}</h3>
            <p><strong>Course:</strong> {t.course} ({t.id})</p>
            <p><strong>Place:</strong> {t.place}</p>
            <p><strong>Mode:</strong> {t.mode}</p>
            <p><strong>Experience:</strong> {t.experience}</p>
            <p><strong>Contact:</strong> {t.contact}</p>
            <p><strong>Email:</strong> {t.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerPage;
