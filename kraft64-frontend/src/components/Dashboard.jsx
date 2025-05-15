import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Input, Form, Modal, message, Tabs, Card, Avatar } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ProfileOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ChangePassword from './ChangePassword';
import ExploreAayarKalai from './Explore/ExploreAayarKalai';
import ExploreTamilTraditionalThings from './Explore/ExploreTamilTraditionalThings';
import TrainerPage from './TrainerPage';
import Profile from './Profile';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const Dashboard = () => {
  const [user, setUser] = useState({ fullName: '', email: '', id: '', bio: '', profilePic: '' });
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.fullName || '');
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
        const updatedUser = { ...user, fullName: data.user.fullName, bio: data.user.bio };
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
          <Avatar size={64} src={user.profilePic} icon={!user.profilePic && <UserOutlined />} />
          <div style={{ marginTop: 8 }}>{user.fullName}</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedSection]}
          onClick={({ key }) => setSelectedSection(key)}
          style={{ fontWeight: '500' }}
        >
          <Menu.Item key="Profile" icon={<ProfileOutlined />}>Profile</Menu.Item>
          <Menu.Item key="EditProfile" icon={<EditOutlined />}>Edit Profile</Menu.Item>
          <Menu.Item key="Explore" icon={<AppstoreOutlined />}>Explore</Menu.Item>
          <Menu.Item key="Train" icon={<TeamOutlined />}>Train</Menu.Item>
          <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f5f5f5' }}>
          {selectedSection === 'Profile' && <Profile user={user} setUser={setUser} />}

          {selectedSection === 'EditProfile' && (
            <Card title="Edit Profile" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
              <Form layout="vertical" onFinish={handleSaveChanges}>
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
              <Button type="link" onClick={() => setIsChangePasswordModalOpen(true)}>Change Password</Button>
            </Card>
          )}

          {selectedSection === 'Explore' && (
            <Tabs defaultActiveKey="1">
              <TabPane tab="Aayar Kalai" key="1"><ExploreAayarKalai /></TabPane>
              <TabPane tab="Tamil Traditional Things" key="2"><ExploreTamilTraditionalThings /></TabPane>
            </Tabs>
          )}

          {selectedSection === 'Train' && (
            <Card title="Trainers" bordered={false}>
              <TrainerPage />
            </Card>
          )}
        </Content>
      </Layout>

      <Modal
        title="Change Password"
        open={isChangePasswordModalOpen}
        onCancel={() => setIsChangePasswordModalOpen(false)}
        footer={null}
      >
        <ChangePassword userId={user.id} />
      </Modal>
    </Layout>
  );
};

export default Dashboard;
