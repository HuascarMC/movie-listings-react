import React, { Component } from 'react';
import MovieListContainer from './containers/MovieListContainer.js'
import SelectedMovieContainer from './containers/SelectedMovieContainer'
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchParams: "pirates",
      currentMovie: undefined,
      hiddenState: false
    }
    this.updateSearch.bind(this)
    this.updateCurrentMovie.bind(this)
  }

  toggleHidden() {
     this.state.hiddenState ? this.updateHiddenState(false) : this.updateHiddenState(true)
  }

  updateHiddenState(boolean) {
    this.setState({
      hiddenState: boolean
    })
  }

  updateSearch(args) {
    this.setState({
      searchParams: args
    }, () => this.forceUpdate() )
    this.forceUpdate()
  }

  updateCurrentMovie(args) {
      axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${args}`)
      .then((response) => {
        console.log(response);
        this.setState({
          currentMovie: response.data
        })
      })
      .catch(function (error) {
        // console.log(error);
    })
  }

  render() {
    return (
      <div className="App">
        <MovieListContainer searchParams={ this.state.searchParams } updateCurrentMovie={ this.updateCurrentMovie.bind(this) } toggleHidden={ this.toggleHidden.bind(this) }/>
        { this.state.hiddenState && <SelectedMovieContainer movie={ this.state.currentMovie } updateSearch={ this.updateSearch.bind(this) } toggleHidden={ this.toggleHidden.bind(this) }/>}
      </div>
    );
  }
}

export default App;
