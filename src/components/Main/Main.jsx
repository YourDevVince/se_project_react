import WeatherCard from '../WeatherCard/WeatherCard';
import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

import ItemCard from '../ItemCard/ItemCard';
import './Main.css';

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const filteredClothingItems = (clothingItems || []).filter(
    (i) => i.weather?.toLowerCase() === weatherData.type
  );

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className='main'>
      <WeatherCard weatherData={weatherData} />
      <section className='cards'>
        <p className='cards__text'>
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className='cards__list'>
          {filteredClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
