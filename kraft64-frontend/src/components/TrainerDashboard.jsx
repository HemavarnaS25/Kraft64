import React, { useEffect, useState } from 'react';
import {
  Layout, Menu, Button, Input, Form, Modal, message, Card, Avatar, List, Select
} from 'antd';
import {
  UserOutlined, LogoutOutlined, BookOutlined, TeamOutlined, ProfileOutlined, PlusOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Option } = Select;

const TrainerDashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', id: '', bio: '', profilePic: '' });
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm] = Form.useForm();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.name || '');
      setBio(storedUser.bio || '');
      fetchCourses(storedUser.id);
      fetchStudents(storedUser.id);
    }
  }, []);

  const fetchCourses = async (trainerId) => {
    try {
      const res = await fetch(`https://kraft64.onrender.com/api/courses/trainer/${trainerId}`);
      const data = await res.json();
      if (res.ok) setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async (trainerId) => {
    try {
      const res = await fetch(`https://kraft64.onrender.com/api/students/trainer/${trainerId}`);
      const data = await res.json();
      if (res.ok) setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://kraft64.onrender.com/api/auth/update-profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, bio }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Profile updated successfully!');
        const updatedUser = {
          ...user,
          name: data.user.fullName,
          bio: data.user.bio,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        message.error(data.msg || 'Update failed.');
      }
    } catch (error) {
      console.error('Frontend error:', error);
      message.error('Error updating profile');
    }
  };

  const handleAddCourse = async (values) => {
    console.log('Form submitted:', values);
    try {
      const res = await fetch('https://kraft64.onrender.com/api/courses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, trainerId: user.id }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success('Course added successfully!');
        setIsCourseModalOpen(false);
        courseForm.resetFields();
        setCourses((prevCourses) => [...prevCourses, data]);
      } else {
        message.error(data.msg || 'Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      message.error('Error adding course');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: '#fff' }}>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 8 }}>{user.name}</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedSection]}
          onClick={({ key }) => setSelectedSection(key)}
          style={{ fontWeight: '500' }}
        >
          <Menu.Item key="Profile" icon={<ProfileOutlined />}>Profile</Menu.Item>
          <Menu.Item key="Courses" icon={<BookOutlined />}>My Courses</Menu.Item>
          <Menu.Item key="Students" icon={<TeamOutlined />}>My Students</Menu.Item>
          <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f5f5f5' }}>
          {selectedSection === 'Profile' && (
            <Card title="Edit Profile" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
              <Form layout="vertical" onFinish={handleSaveChanges}>
                <Form.Item label="Username">
                  <Input value={user.username || user.email?.split('@')[0]} disabled />
                </Form.Item>
                <Form.Item label="Email">
                  <Input value={user.email} disabled />
                </Form.Item>
                <Form.Item label="Full Name">
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>Save Changes</Button>
                </Form.Item>
              </Form>
            </Card>
          )}

          {selectedSection === 'Courses' && (
            <Card
              title="My Courses"
              bordered={false}
              extra={<Button icon={<PlusOutlined />} onClick={() => setIsCourseModalOpen(true)}>Add Course</Button>}
            >
              <List
                itemLayout="horizontal"
                dataSource={courses}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={`Place: ${item.place}, Mode: ${item.mode}, Fees: ₹${item.fees}`}
                    />
                  </List.Item>
                )}
              />
              <Modal
                title="Add New Course"
                open={isCourseModalOpen}
                onCancel={() => setIsCourseModalOpen(false)}
                footer={null}
                forceRender
              >
                <Form
                  layout="vertical"
                  form={courseForm}
                  onFinish={handleAddCourse}
                  onFinishFailed={(err) => {
                    console.log('Form validation failed:', err);
                    message.error('Please fill in all required fields.');
                  }}
                >
                  <Form.Item name="name" label="Course Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="place" label="Place" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="proof" label="Proof (Link)">
                    <Input />
                  </Form.Item>
                  <Form.Item name="contact" label="Contact" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="fees" label="Fees" rules={[{ required: true }]}>
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item name="mode" label="Mode of Learning" rules={[{ required: true }]}>
                    <Select placeholder="Select mode">
                      <Option value="Online">Online</Option>
                      <Option value="Offline">Offline</Option>
                      <Option value="Hybrid">Hybrid</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>Add Course</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
          )}

          {selectedSection === 'Students' && (
            <Card title="My Students" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={students}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.name}
                      description={item.email}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TrainerDashboard;