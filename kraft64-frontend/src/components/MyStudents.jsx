import React, { useEffect, useState } from 'react';
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const MyStudents = ({ trainerId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`https://kraft64.onrender.com/api/courses/trainer/${trainerId}`);
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, [trainerId]);

  return (
    <div>
      <Title level={2}>My Students</Title>
      {courses.map(course => (
        <Card key={course._id} title={course.name} style={{ marginBottom: 16 }}>
          <List
            dataSource={course.students}
            renderItem={student => (
              <List.Item>
                {student.name} ({student.email})
              </List.Item>
            )}
            locale={{ emptyText: 'No students yet' }}
          />
        </Card>
      ))}
    </div>
  );
};

export default MyStudents;