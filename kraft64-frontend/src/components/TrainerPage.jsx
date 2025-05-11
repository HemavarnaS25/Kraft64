// components/TrainerPage.js
import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, message } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const TrainerPage = () => {
  const [courses, setCourses] = useState([]);

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

  return (
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
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TrainerPage;
