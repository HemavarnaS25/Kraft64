import React, { useEffect, useState } from 'react';
import { Card, List, Button, Modal, Form, Input, message } from 'antd';
import { BookOutlined } from '@ant-design/icons';

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
    <>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <Card
              title={course.name}
              extra={`Fees: ₹${course.fees}`}
              style={{ borderRadius: 10 }}
            >
              <p><strong>Place:</strong> {course.place}</p>
              <p><strong>Mode:</strong> {course.mode}</p>
              <p><strong>Trainer:</strong> {course.trainerId?.name}</p>
              <p><strong>Contact:</strong> {course.contact}</p>
              <p><strong>Experience:</strong> {course.experience}</p>
              {course.proof && <p><strong>Proof:</strong> <a href={course.proof} target="_blank" rel="noreferrer">View</a></p>}
              <Button
                type="primary"
                icon={<BookOutlined />}
                onClick={() => handleJoin(course)}
              >
                Join
              </Button>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal to enter student details */}
      <Modal
        title="Join Course"
        visible={isModalVisible}
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
          <Form.Item label="Name">
            <Input
              value={studentDetails.name}
              onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={studentDetails.email}
              onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TrainerPage;
