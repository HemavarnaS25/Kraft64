import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Input,
  Form,
  Modal,
  message,
  Card,
  Avatar,
  List,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  BookOutlined,
  TeamOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const TrainerDashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', id: '', bio: '', profilePic: '' });
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.name || '');
      setBio(storedUser.bio || '');
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: '#fff' }}>
        <div className="logo" style={{ textAlign: 'center', margin: '16px 0' }}>
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
                  <Input value={user.name} disabled />
                </Form.Item>
                <Form.Item label="Full Name">
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email">
                  <Input value={user.email} disabled />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>Save Changes</Button>
                </Form.Item>
              </Form>
            </Card>
          )}

          {selectedSection === 'Courses' && (
            <Card title="My Courses" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { title: 'Bharatanatyam Level 1', students: 12 },
                  { title: 'Tamil Grammar Advanced', students: 8 },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={`Students Enrolled: ${item.students}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}

          {selectedSection === 'Students' && (
            <Card title="My Students" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { name: 'Aaravi S.', email: 'aaravi@example.com' },
                  { name: 'Rohan V.', email: 'rohan@example.com' },
                ]}
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
