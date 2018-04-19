import React, { Component } from 'react';
import './App.css';
import trim from 'trim';
import _ from 'lodash';
import firebase from 'firebase';

class App extends Component {
  constructor(props){
    super(props);
    this.onEnter = this.onEnter.bind(this)
    this.onChange = this.onChange.bind(this)
    var config = {
      apiKey: "AIzaSyD2XVt4kaL9JbQMbaFhHKbelI84TDqslxw",
      authDomain: "todos-selected.firebaseapp.com",
      databaseURL: "https://todos-selected.firebaseio.com",
      projectId: "todos-selected",
      storageBucket: "todos-selected.appspot.com",
      messagingSenderId: "651775061502"
    };
    firebase.initializeApp(config);
    var list = firebase.database().ref('/todos')
    list.on('value', snapshot => {
      this.getDataToItems(snapshot.val());
    });

    this.state = {
      Items: [],
      inputText: ''
    };
  }

  getDataToItems(values) {
   var Item = values
   var Fetch = _(Item)
               .keys()
               .map(key => {
                  var clone = _.clone(Item[key]);
                  clone.key = key;
                  return clone;
                }).value();
                console.log(Fetch)
    this.setState({
      Items: Fetch
    })
  }
  onEnter(e){
    if(e.keyCode === 13 && trim(e.target.value) !== '') {
      var connectDB = firebase.database().ref('/todos');
      connectDB.push({
        todos: trim(e.target.value)
      });
      this.setState({
        inputText: ''
      });
    }
  }

  onChange(e){
    this.setState({
      inputText: e.target.value
    })
  }  

  render() {
    var Todos = this.state.Items.map(data => {
      return (
        <div className="card" key={data.key}>
          <div className="card-content" key={data.key}>
            {data.todos}
          </div>
        </div>
      )
    });
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-6">
          <form>
            <textarea 
                className="textarea"
                placeholder="Type a message"
                cols="100"
                onChange={this.onChange}
                onKeyUp={this.onEnter}
                value={this.state.inputText}>
            </textarea>
          </form>
          <h1>Data</h1>
          {Todos}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
