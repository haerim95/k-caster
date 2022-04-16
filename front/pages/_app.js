import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const App = ({ Component, location }) => {
  return (
    <>
      <Head>
        <meta charSet='urf-8' />
        <title>익명의 캐스터</title>
      </Head>
      <Component location={location} />

      {/* ! 수정해야함... */}
      <p>
        <a
          href='https://github.com/haerim95/anonymous-caster'
          target='_blank'
          rel='noreferrer nopener'
        >
          Made By Hearim
        </a>
      </p>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default wrapper.withRedux(App);
