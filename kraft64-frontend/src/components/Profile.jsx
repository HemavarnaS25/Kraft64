import React, { useState } from 'react';
import {
  Avatar,
  Upload,
  Button,
  Input,
  Form,
  Row,
  Col,
  Typography,
  message,
  Divider,
  Card,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const { Title, Text } = Typography;

const Profile = ({ user, setUser }) => {
  const [image, setImage] = useState(user.profilePic || '');
  const [linkedIn, setLinkedIn] = useState(user.linkedIn || '');
  const [xLink, setXLink] = useState(user.xLink || '');
  const [fullName, setFullName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');

  const handleImageUpload = async (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      try {
        const response = await fetch(
          `https://kraft64.onrender.com/api/auth/update-profile-pic/${user.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profilePic: base64 }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          const updatedUser = { ...user, profilePic: base64 };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          setImage(base64);
          message.success('Profile picture updated!');
        } else {
          message.error(data.msg || 'Failed to update picture.');
        }
      } catch (err) {
        console.error(err);
        message.error('Error uploading picture.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSocials = async () => {
    try {
      const response = await fetch(
        `https://kraft64.onrender.com/api/auth/update-socials/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ linkedIn, xLink }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedUser = { ...user, linkedIn, xLink };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        message.success('Social links updated successfully!');
      } else {
        message.error(data.msg || 'Failed to update social links.');
      }
    } catch (error) {
      console.error(error);
      message.error('Error updating social links.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `https://kraft64.onrender.com/api/auth/update-profile/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, bio }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedUser = {
          ...user,
          name: data.user.fullName,
          bio: data.user.bio,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        message.success('Profile updated successfully!');
      } else {
        message.error(data.msg || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      message.error('Error updating profile.');
    }
  };

  const timelineData = [
    { date: 'Jan', arts: 4 },
    { date: 'Feb', arts: 6 },
    { date: 'Mar', arts: 8 },
    { date: 'Apr', arts: 5 },
    { date: 'May', arts: 7 },
  ];

  return (
    <div className="profile-container">
      <Card bordered hoverable>
        <Title level={3}>Your Profile</Title>
        <Row gutter={24} align="middle" style={{ marginBottom: '2rem' }}>
          <Col xs={24} sm={6} className="profile-avatar-col">
            <Avatar
              src={image || '/images/default-avatar.png'}
              size={120}
              className="profile-avatar"
            />
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />} className="profile-upload-btn">
                Upload
              </Button>
            </Upload>
          </Col>
          <Col xs={24} sm={18} className="profile-info-col">
            <Text strong>Email:</Text> <Text>{user.email}</Text>
            <br />
            <Text strong>Daily Activity:</Text>{' '}
            <Text>Learned 3 new arts today!</Text>
          </Col>
        </Row>

        <Divider className="profile-divider" />

        <Title level={4}>Edit Details</Title>
        <Form layout="vertical" onFinish={handleSaveProfile}>
          <Form.Item label="Full Name">
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Bio">
            <Input.TextArea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Profile Info
            </Button>
          </Form.Item>
        </Form>

        <Divider className="profile-divider" />

        <Title level={4}>Learning Timeline</Title>
        <div className="timeline-chart">
          <LineChart width={500} height={250} data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="arts"
              stroke="#1677ff"
              strokeWidth={2}
            />
          </LineChart>
        </div>

        <Divider className="profile-divider" />

        <Title level={4}>Social Links</Title>
        <Form layout="vertical" onFinish={handleSaveSocials} className="profile-form">
          <Form.Item label="LinkedIn URL">
            <Input
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="X (Twitter) URL">
            <Input value={xLink} onChange={(e) => setXLink(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Social Links
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
