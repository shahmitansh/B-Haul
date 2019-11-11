import React from 'react';
import './App.css';
import HeaderBuy from './Header/HeaderBuy.js';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  'Table', 'Desk', 'Chair', 'Bed'
]
const defaultOption = options[0];

function App() {
  return (
    <div>
      <HeaderBuy />
      <div>
        <div className="Body-Prompt"> What are you looking for? </div>
        <Dropdown className='Options' options={options} value={defaultOption} placeholder="Select an option" />
        <div className="Click"> Next > </div>
      </div>
    </div>
  );
}

export default App;
