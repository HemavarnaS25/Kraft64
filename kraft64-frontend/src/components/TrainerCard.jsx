import React from 'react';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="trainer-card">
      <h2>{trainer.name}</h2>
      <p><strong>Course:</strong> {trainer.courseName} ({trainer.courseId})</p>
      <p><strong>Place:</strong> {trainer.place}</p>
      <p><strong>Mode:</strong> {trainer.mode}</p>
      <p><strong>Experience:</strong> {trainer.experience}</p>
      <p><strong>Email:</strong> {trainer.email}</p>
      <p><strong>Contact:</strong> {trainer.contact}</p>
    </div>
  );
};

export default TrainerCard;