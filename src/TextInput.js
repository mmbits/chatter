import React from 'react'
import { FiSend } from "react-icons/fi";
//test
class TextInput extends React.Component {

  state={
    text:""
  }

  send = () => {
    this.props.sendMessage(this.state.text)
    this.setState({text:""})
  }

  keyPress = (e) => {
    if(e.key==='Enter'){
      this.send()
    }
  }

  render(){
    return(<div className="text-input">
      <input value={this.state.text}
        onKeyPress={this.keyPress}
        placeholder="Write your message here..."
        onChange={e=> this.setState({text: e.target.value})}/>
      <button disabled={!this.state.text} onClick={this.send}>
        <FiSend style={{height:15,width:15}} />
      </button>
  </div>)
  }
}

export default TextInput
