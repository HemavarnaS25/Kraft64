import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/activity')
      .then(res => res.json())
      .then(data => setActivities(data));

    socket.on('activity', (newActivity) => {
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    });

    return () => socket.off('activity');
  }, []);

  return (
    <List
      header={<strong>Recent Activity</strong>}
      bordered
      dataSource={activities}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="👤" />}
            title={`${item.username} - ${item.action}`}
            description={new Date(item.timestamp).toLocaleString()}
          />
        </List.Item>
      )}
    />
  );
};

export default ActivityFeed;
