import React, { useEffect, useMemo, useState } from 'react';
import { Card, Spin, Space } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CALL_WEATHER_REQUEST } from '../reducers/weather';

const Weather = () => {
  const dispatch = useDispatch();
  const { weatherInfo, location, weatherCallLoading } = useSelector(
    state => state.weather
  );

  // 스타일
  const WeatherIcon = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(#e9577f, transparent),
      linear-gradient(-80deg, #c96edc, transparent),
      linear-gradient(-45deg, #aa7dec, transparent),
      linear-gradient(45deg, #57a4eb, transparent);
    background-blend-mode: sreen;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;

    img {
      width: 60%;
      height: 60%;
      position: relative;
      z-index: 2;
    }

    ::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 116px;
      height: 116px;
      top: 50%;
      left: 50%;
      margin-top: -58px;
      margin-left: -58px;
      border-radius: 50%;
      background: #ffffff;
      z-index: 1;
    }
  `;

  const WeatherStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin-left: 15px;
      margin-bottom: 0;
      padding: 0;
      font-size: 1rem;
      span {
        display: inline-block;
        margin-left: 5px;
        font-size: 1.4rem;
      }
    }
  `;

  const cardStyle = useMemo(() => ({ marginTop: 10 }), []);

  useEffect(() => {
    dispatch({
      type: CALL_WEATHER_REQUEST
    });
  }, []);

  return (
    <div>
      <Card title='오늘의 날씨' style={cardStyle}>
        <WeatherStyle>
          {weatherCallLoading === false ? (
            <div>
              {weatherInfo.main === undefined &&
              weatherInfo.weather === undefined ? null : (
                <div>
                  <WeatherIcon>
                    <img
                      src={`/images/${weatherInfo.weather[0].main}.png`}
                      role='presentation'
                    />
                  </WeatherIcon>
                  <div>
                    <p>
                      <span>{weatherInfo.name}</span>
                      {weatherInfo.weather[0].description}
                    </p>
                    <p>
                      현재 온도
                      <span>{Math.floor(weatherInfo.main.temp)} °C</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Space size='middle'>
              <Spin size='large' />
            </Space>
          )}
        </WeatherStyle>
      </Card>
    </div>
  );
};

export default Weather;
