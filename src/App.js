import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import HomeComponent from './component/TableInfo/home';

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <Switch>
          <Route path="/" exact title="Home" component={HomeComponent} />
        </Switch>
      </div>

    );
  }
}

export default App;