import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import './style/index.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search">
            <Header />
            <Search />
          </Route>
          <Route path="/album/:id">
            <Header />
            <Route path="/album/:id" component={ Album } />
          </Route>
          <Route path="/favorites">
            <Header />
            <Favorites />
          </Route>
          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

// João Matheus Silva Franca
