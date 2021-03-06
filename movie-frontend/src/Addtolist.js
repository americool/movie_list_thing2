import React, {Component} from 'react';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import './App.css';


class AddToList extends Component {
  constructor() {
    super();
    this.state = {
      movieId: null,
      rating: null,
    }
    this.addMovie = this.addMovie.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentDidMount() {
    this.setState({rating:this.props.rating})
    console.log(this.state.rating)
  }
  handleRatingChange(rating){
    this.setState({rating: rating})
  }

  addMovie(event) {
    event.preventDefault()
    const {Title, imdbID} = this.props.movieProps
    console.log(Title, imdbID, this.state.rating, this.props.listId)
    axios.post('http://localhost:4000/movies/', {
      movie: {
        title: Title,
        rating: this.state.rating,
        imdbid: imdbID
      }
    }).then((res) => {
      console.log(res)
      this.setState({movieId: res.data.id})
      this.addMovieToList()
      // this.props.refreshUpdate
    }).catch((error) => {
      alert(error)
    })
  }
  addMovieToList() {
    console.log(this.props.listId, this.state.movieId)
    axios.post('http://localhost:4000/lists/add_movie_to_list', {
      list_id: this.props.listId,
      movie_id: this.state.movieId,
      rating: this.state.rating
    }).then((res) => {
      alert("Added!");
      this.setState({displayOn: false, title:"", movieProps: null})
      if (this.props.onMovieAdded){
        this.props.onMovieAdded();
      }

    }).catch((error) => {
      alert(error)
    })
  }


  render(){
    return(
      <div className={this.props.ratingStyle}>
        <p> Enter Rating: </p>
      <NumericInput onChange={this.handleRatingChange} value={this.state.rating} min={1} max={5} precision={1} step={0.5} />
      <p> Add to List? </p>
      <button onClick={this.addMovie}> Add! </button>
      </div>
    )
  }
}

export default AddToList;
