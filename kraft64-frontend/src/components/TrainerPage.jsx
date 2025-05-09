import React, { useState, useEffect } from 'react';
import { Card, Row, Col, List, Avatar, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const TrainerPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Sample data fetching
  useEffect(() => {
    // Example API call to fetch trainers (replace with your actual API)
    fetch('https://kraft64.onrender.com/api/trainers')
      .then((response) => response.json())
      .then((data) => setTrainers(data))
      .catch((error) => console.error('Error fetching trainers:', error));
  }, []);

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTrainer(null);
  };

  return (
    <div>
      <Row gutter={16}>
        {trainers.length === 0 ? (
          <p>No trainers available</p>
        ) : (
          trainers.map((trainer) => (
            <Col span={8} key={trainer.id}>
              <Card
                hoverable
                cover={<img alt="trainer" src={trainer.imageUrl || 'default.jpg'} />}
                onClick={() => handleTrainerClick(trainer)}
              >
                <Card.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={trainer.name}
                  description={trainer.experience}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal
        title={selectedTrainer?.name}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedTrainer && (
          <div>
            <p><strong>Experience:</strong> {selectedTrainer.experience}</p>
            <p><strong>Contact:</strong> {selectedTrainer.contact}</p>
            <p><strong>Course Name:</strong> {selectedTrainer.courseName}</p>
            <p><strong>Course ID:</strong> {selectedTrainer.courseId}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TrainerPage;
