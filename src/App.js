import React from 'react';
import logo from './swirly.png';
//from  http://pluspng.com/png-logo-design-2476.html
//  "Use these free PNG Logo Design for your personal projects or designs."
import './App.css';
import TextInput from './TextInput'

class App extends React.Component {
  state={
    messages:[]
  }

  sendMessage = (m) => {
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }

  render() {
    var {messages} = this.state
    return (
      <div className="App">
        <header className="headerer">
          <img src={logo} alt="stolen logo" className="logo" />
          Chatter
        </header>
        <main className="messages">
          {messages.map((m,i)=>{
            return (<div key={i}>
              {m}
              </div>)
          })}
        </main>
        <TextInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
