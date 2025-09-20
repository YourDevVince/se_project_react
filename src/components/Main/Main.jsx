import WeatherCard from '../WeatherCard/WeatherCard';

import ItemCard from '../ItemCard/ItemCard';
import './Main.css';

function Main({ weatherData, handleCardClick, items }) {
  const list = (items || []).filter(
    (i) => i.weather?.toLowerCase() === weatherData.type
  );

  return (
    <main className='main'>
      <WeatherCard weatherData={weatherData} />
      <section className='cards'>
        <p className='cards__text'>
          Today is {weatherData.temp.F} &deg;F / You may want to wear:
        </p>
        <ul className='cards__list'>
          {list.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
