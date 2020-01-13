import React, { Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
  state = {
    posts: [],
    loading: false,
    fetchSuccess: false
  }

  componentDidMount(){
    this.fetchPosts()
  }

  fetchPosts = () => {
    this.setState({ loading: true })
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      console.log(response.data)
      this.setState({ posts : response.data })
      this.setState({ loading: false, fetchSuccess: true });
    })
    .catch(error => {
      console.log(error)
      this.setState({ loading: false });
    })
  }

  renderPosts = (posts) => {
    return posts.map(post => {
      return (
        <div key={post.title} className="post-container">
          <h4>{post.title}</h4>
          <img className="post-image" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt={post.title} />
          <p>{post.body}</p>
        </div>
      )
    })
  }

  render(){
    const { posts,loading, fetchSuccess } = this.state;
    return (
      <div className="App">
        <h3 className="page-header">Welcome to My Blog</h3>
        {
          loading ? (
            <h6 className="loader">Loading posts...</h6>
          ) : (
            fetchSuccess ? ( null ) :
            <h5>Your posts will appear here</h5>
          )
        }
        {this.renderPosts(posts)}
        <button className="fetch-button" onClick={() => this.fetchPosts()}>Fetch Posts</button>
      </div>
    );
    }
}

export default App;
