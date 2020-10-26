import React from 'react';
//import { Route, Switch, Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import HomeComponent from './component/TableInfo/home';

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <HomeComponent/>
        
      </div>

    );
  }
}

export default App;