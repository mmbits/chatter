import React from 'react';
import logo from './swirly.png';
//from  http://pluspng.com/png-logo-design-2476.html
//  "Use these free PNG Logo Design for your personal projects or designs."
import './App.css';
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Div100vh from 'react-div-100vh';

class App extends React.Component {
  state = {
    messages: [],
    name: '',
    editName: false,
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
    }

    /* <=========================> */
    const firebaseConfig = {
      apiKey: "AIzaSyCCWUJeRd9BqWL3Pot1HsAgp3IuXlItIp4",
      authDomain: "chatter-6d350.firebaseapp.com",
      databaseURL: "https://chatter-6d350.firebaseio.com",
      projectId: "chatter-6d350",
      storageBucket: "chatter-6d350.appspot.com",
      messagingSenderId: "988024720396",
      appId: "1:988024720396:web:0053baae399cb929"
    };

    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type === 'removed') {
          this.remove(change.doc.id)
        }
      })
    })
    /* <=========================> */
  }

  remove = (id) => {
    var msgs = [...this.state.messages]
    var messages = msgs.filter(m => m.id !== id)
    this.setState({ messages })
  }

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  takePicture = async (img) => {
    this.setState({ showCamera: false })
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID + '.jpg');
    await ref.putString(img, 'data_url')
    this.send({ img: imgID })
  }

  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({ editName })
  }

  render() {
    var { messages, name, editName } = this.state
    return (
      <Div100vh className="App">
        <header className="headerer">
          <img
            src={logo}
            alt="stolen logo"
            className="logo"
          />
          Chatter
          <NamePicker
            name={name}
            editName={editName}
            // changeName={function(value){ this.setState({name: value}).bind(this)} }
            changeName={value => this.setState({ name: value })}
            setEditName={this.setEditName}
          />
        </header>
        <main className="messages">
          {messages.map((m, i) => {
            return (<Message key={i} m={m} name={name}
              onClick={() => {
                if (name === m.from || name === "Marci") {
                  this.db.collection('messages').doc(m.id).delete()
                }
              }}
                
            />)
          })}
        </main>
        <TextInput sendMessage={t => this.send({ text: t })} />
      </Div100vh>
    );
  }
}

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatter-6d350.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message(props) {
  var { m, name, onClick } = props
  return (<div className="bubble-wrap"
    from={m.from === name ? "me" : "you"}
    onClick={onClick}
  >
    {m.from !== name && <div className="bubble-name">{m.from}</div>}
    <div className="bubble">
      <span>{m.text}</span>
      {m.img && <img alt="pic" src={bucket + m.img + suffix} />}
    </div>
  </div>)
}
