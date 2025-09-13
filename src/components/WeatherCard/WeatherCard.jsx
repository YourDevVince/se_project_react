import './WeatherCard.css';
import Sunny from '../../assets/sunny.png';
import { useState } from 'react';

function WeatherCard() {
  const [weatherTemp, setWeatherTemp] = useState(75);

  return (
    <section className='weather-card'>
      <p className='weather-card__temp'>{weatherTemp} &deg; F</p>
      <img src={Sunny} alt='' className='weather-card__image' />
    </section>
  );
}

export default WeatherCard;
