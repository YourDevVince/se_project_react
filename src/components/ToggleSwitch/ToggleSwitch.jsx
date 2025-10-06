import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css';

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitch } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        className='toggle-switch__checkbox'
        onChange={handleToggleSwitch}
        checked={currentTemperatureUnit === 'C'}
      />
      <span className='toggle-switch__circle'></span>
      <span
        style={{ color: currentTemperatureUnit === 'F' ? 'white' : '' }}
        className='toggle-switch__text toggle-switch__text_F'
      >
        F
      </span>
      <span
        style={{ color: currentTemperatureUnit === 'C' ? 'white' : '' }}
        className='toggle-switch__text toggle-switch__text_C'
      >
        C
      </span>
    </label>
  );
}
