import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginoutAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(loginoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹 <br />0
        </div>,
        <div key='followings'>
          팔로잉 <br />0
        </div>,
        <div key='followers'>
          팔로워 <br />0
        </div>,
      ]}
    >
      <Card.Meta title='Hilda' avatar={<Avatar>H</Avatar>} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;