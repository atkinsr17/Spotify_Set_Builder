import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Components/Player";
import "./App.css";

class App extends Component {
  state = {
    token: null
  }

  // get token
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player
              token={this.state.token}
            />
          )}
        </header>
      </div>
    );
  }
}
/** 
const mapStateToProps = state => ({
  getCurrentlyPlaying(
})
*/
export default App;
