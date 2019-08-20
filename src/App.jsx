import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Index from './pages/Index';
import TodoList from './pages/TodoList';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>

        <Switch>
          <Route path="/" exact component={Index}></Route>
          <Route path="/todoList/" component={TodoList}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
