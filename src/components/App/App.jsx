import { useEffect, useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, WEATHER_API_KEY } from '../../utils/constants';

import { defaultClothingItems } from '../../utils/constants';
import { use } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const link = form.imageUrl.value.trim();
    const weather = form.weather.value;
    if (!name || !link || !weather) return;

    setItems((prev) => [
      { _id: Date.now(), name, link, weather: weather.toLowerCase() },
      ...prev,
    ]);
    form.reset();
    setActiveModal('');
  };

  useEffect(() => {
    getWeather(coordinates, WEATHER_API_KEY)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.lerror('Weather load failed', err);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [activeModal]);
  return (
    <div className='app'>
      <div className='app__content'>
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          items={items}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        name='add-garment'
        buttonText='Add garment'
        title='New garment'
        isOpen={activeModal === 'add-garment'}
        handleCloseClick={closeActiveModal}
        onSubmit={handleAddItemSubmit}
      >
        <label htmlFor='name' className='modal__label'>
          Name{' '}
          <input
            type='text'
            name='name'
            className='modal__input'
            id='name'
            placeholder='Name'
            required
          />
        </label>
        <label htmlFor='imageUrl' className='modal__label'>
          Image{' '}
          <input
            type='url'
            name='imageUrl'
            className='modal__input'
            id='imageUrl'
            placeholder='Image URL'
            required
          />
        </label>
        <fieldset className='modal__radio-buttons'>
          <legend className='modal__legend'>Select the weather type:</legend>
          <label htmlFor='hot' className='modal__label modal__label_type_radio'>
            <input
              name='weather'
              type='radio'
              id='hot'
              className='modal__radio-input'
              value='hot'
            />{' '}
            <span className='radio__label'>Hot</span>
          </label>
          <label
            htmlFor='warm'
            className='modal__label modal__label_type_radio'
          >
            <input
              name='weather'
              type='radio'
              id='warm'
              className='modal__radio-input'
              value='warm'
            />{' '}
            <span className='radio__label'>Warm</span>
          </label>
          <label
            htmlFor='cold'
            className='modal__label modal__label_type_radio'
          >
            <input
              name='weather'
              type='radio'
              id='cold'
              className='modal__radio-input'
              value='cold'
            />{' '}
            <span className='radio__label'>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
