import React, { useCallback, useMemo } from 'react';
import PropTtypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import Weather from './Weather';
import { CALL_WEATHER_REQUEST } from '../reducers/weather';
import useInput from '../hooks/useInput';
import Router from 'next/router';

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col::first-child{
    padding-left: 0 !important;
  }

  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const Common = styled.div`
  @media screen and (min-width: 1824px) {
    max-width: 1824px;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  padding: 0 10px;
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const dispatch = useDispatch();

  const { me } = useSelector(state => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <Common>
      <Global />
      <Menu mode='horizontal'>
        <Menu.Item key='menu1'>
          <Link href='/'>
            <a>K-캐스터</a>
          </Link>
        </Menu.Item>
        {me && me.id ? (
          <Menu.Item key='menu4'>
            <Link href={`/profile/${me.id}`}>
              <a>프로필</a>
            </Link>
          </Menu.Item>
        ) : null}
        {me && me.id ? null : (
          <Menu.Item key='menu4'>
            <Link href='/signup'>
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key='menu3'>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            placeholder='#해시태그를 입력해주세요'
            type='primary'
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8} style={{ marginTop: 10 }}>
        <Col xs={24} md={4}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={20}>
          <Wrapper>{children}</Wrapper>
        </Col>
      </Row>
    </Common>
  );
};

AppLayout.propTypes = {
  children: PropTtypes.node.isRequired
};

export default AppLayout;
