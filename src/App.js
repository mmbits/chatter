import React from 'react';
import logo from './swirly.png';
//from  http://pluspng.com/png-logo-design-2476.html
//  "Use these free PNG Logo Design for your personal projects or designs."
import './App.css';
import TextInput from './TextInput'
import NamePicker from './NamePicker'

class App extends React.Component {
  state={
    messages:[],
    name:'',
    editName:false,
  }

  componentWillMount(){
    var name = localStorage.getItem('name')
    if(name) {
      this.setState({name})
    }
  }

  sendMessage = (text) => {
    var m = {
      text,
      name: this.state.name,
    }
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }

  setEditName = (editName) => {
    if(!editName){
      localStorage.setItem('name', this.state.name)
    }
    this.setState({editName})
  }

  render() {
    var {messages, name, editName} = this.state
    return (
      <div className="App">
        <header className="headerer">
          <img
            src={logo}
            alt="stolen logo"
            className="logo"
          />
          Chatter
          <NamePicker
            name = {name}
            editName={editName}
            // changeName={function(value){ this.setState({name: value}).bind(this)} }
            changeName={value=> this.setState({name: value})}
            setEditName={this.setEditName}
          />
        </header>
        <main className="messages">
          {messages.map((m,i)=>{
            return (<div key={i} className="bubble-wrap" from={m.name===name ? "me" : "you"}>
              {m.name!==name && <div className="bubble-name">{m.name}</div>}
              <div className="bubble">
                <span>{m.text}</span>
              </div>
            </div>)
          })}
        </main>
        <TextInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
