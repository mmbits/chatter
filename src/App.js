import React from 'react';
import logo from './swirly.png';
//from  http://pluspng.com/png-logo-design-2476.html
//  "Use these free PNG Logo Design for your personal projects or designs."
import './App.css';
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="headerer">
        <img src={logo} alt="stolen logo" class="logo" />
        Chatter
        </header>
        <TextInput/>
    </div>
  );
}

export default App;
