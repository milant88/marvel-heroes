import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HeroItem from './components/HeroItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            heroes: null,
            activePage: 1,
            bookmarkedHeroes: []
        };

        this._allHeroes = this._allHeroes.bind(this);
        this._initializeHeroes = this._initializeHeroes.bind(this);
    }

    componentWillMount() {
        this._initializeHeroes();
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Marvel Heroes</h1>
        </header>
          <p className="App-intro">
              <input
                  onChange={this._onSearch.bind(this)}
                  autoFocus={true}
                  placeholder="Search here for your favorite characters"
                  value={this.state.searchValue}
                  className="search-bar"/>
          </p>
          <div className="hero-container">
              {this.state.heroes ?
                  this.state.heroes.map(hero =>
                      <HeroItem
                          key={hero.id}
                          name={hero.name}
                          thumbnail={hero.thumbnail.path}
                          extension={hero.thumbnail.extension}
                          alt="missing picture"
                          onClick={() => this._bookmarkHero(hero)}
                      />
                  )
                  : null}
          </div>
      </div>
    );
  }

    _bookmarkHero(hero) {
        console.log('hero clicked: ', hero);
        localStorage.setItem(`${hero.id}`, JSON.stringify(hero));
    }

    _onSearch(event) {
        this.setState({searchValue: event.target.value});
        setTimeout(function() {
            this._allHeroes();
        }.bind(this), 1000);

    }

    _initializeHeroes() {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=bdd06d316995e8cbd513db2029205388`).then(result => {
            this.setState({
                heroes: result.data.data.results
            });

        }).catch(error => console.log('Error fetching and parsing data', error));
    }

    _allHeroes() {

        if(this.state.searchValue === '') {
            this._initializeHeroes();
        } else if(this.state.searchValue) {
            axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${this.state.searchValue}&limit=100&apikey=bdd06d316995e8cbd513db2029205388`).then(result => {
                this.setState({
                    heroes: result.data.data.results
                });

            }).catch(error => console.log('Error fetching and parsing data', error));
        }
    };

}

export default App;
