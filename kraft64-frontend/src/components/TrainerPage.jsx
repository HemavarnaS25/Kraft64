import React, { useEffect, useState } from 'react';
import { Card, List, Button, Modal, Form, Input, message, Row, Col, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TrainerPage = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentDetails, setStudentDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('https://kraft64.onrender.com/api/courses/all');
        const data = await res.json();
        if (res.ok) setCourses(data);
        else message.error(data.msg || 'Failed to fetch courses');
      } catch (error) {
        console.error('Error fetching courses:', error);
        message.error('Error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  const handleJoin = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleAddStudent = async () => {
    const { name, email } = studentDetails;
    if (!name || !email) {
      message.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch(`https://kraft64.onrender.com/api/courses/join/${selectedCourse._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        message.success(data.msg);
        setIsModalVisible(false);
        setStudentDetails({ name: '', email: '' });
      } else {
        message.error(data.msg || 'Failed to join course');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      message.error('Error joining course');
    }
  };

  return (
    <div className="trainer-page">
      <Title level={2} className="page-title">Available Courses</Title>

      <Row gutter={[24, 24]} justify="center">
        {courses.map((course) => (
          <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="course-card"
              title={<strong>{course.name}</strong>}
              extra={<span className="fees">₹{course.fees}</span>}
              hoverable
            >
              <p><strong> Place:</strong> {course.place}</p>
              <p><strong> Mode:</strong> {course.mode}</p>
              <p><strong> Trainer:</strong> {course.trainerId?.fullName}</p>
              <p><strong> Contact:</strong> {course.contact}</p>
              <p><strong> Experience:</strong> {course.experience}</p>
              {course.proof && (
                <p><strong>📄 Proof:</strong> <a href={course.proof} target="_blank" rel="noreferrer">View</a></p>
              )}
              <Button
                type="primary"
                icon={<BookOutlined />}
                className="join-btn"
                onClick={() => handleJoin(course)}
              >
                Join
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Join Course"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddStudent}>
            Add
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Your Name">
            <Input
              placeholder="Enter your name"
              value={studentDetails.name}
              onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email Address">
            <Input
              placeholder="Enter your email"
              value={studentDetails.email}
              onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrainerPage;
