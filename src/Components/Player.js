import React, { Component } from "react";
import * as $ from "jquery";
import "./Player.css";
import axios from 'axios';
import { AUDIO_ANALYZED } from '../actions/types';


class Player extends Component {
  state = {
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      id: '',
      artists: [{ name: "" }],
      duration_ms: 0,
    },
    is_playing: "Paused",
    progress_ms: 0,
    backgroundStyles: null,
    progressBarStyles: null,
    analyzed: false,
    data: "",
  }

  componentDidMount() {
    this.getCurrentlyPlaying(this.props.token);
  }

  getAudioAnalysis = (token, id) => {
    $.ajax({
      url: "https://api.spotify.com/v1/audio-analysis/" + id,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          analyzed: true,
        });
        return JSON.stringify(data);
      }
    });
  }

  sendDataToMongo = (data) => {
    axios.post("http://localhost:8000/api/audioAnalysis", data)
      .then(res =>
        dispatchEvent({
          type: AUDIO_ANALYZED,
          payload: res.data
        })
      ).catch(err =>
        console.log(err)
      );
  }

  getUserPlaylists = (token) => {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          playlists: data,
        });
      }
    });
    console.log(this.state.playlists);
  }

  // get the currently playing song
  getCurrentlyPlaying = (token) => {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (data) {
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms,
            backgroundStyles: {
              backgroundImage: `url(${
                data.item.album.images[0].url
                })`
            },
            progressBarStyles: {
              width: (data.progress_ms * 100 / data.item.duration_ms) + '%'
            },
          });
        }
      }
    });
    console.log(this.state.item.id);
  }

  test = () => {
    var data = this.getAudioAnalysis(this.props.token, this.state.item.id);
    while (!data) { }
    console.log(data);
  }

  render() {
    return (
      < div className="App" >
        {this.state.item.id && !this.state.analyzed && this.test()}
        <div className="main-wrapper">
          <div className="now-playing__img">
            <img src={this.state.item.album.images[0].url} alt={''} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{this.state.item.name}</div>
            <div className="now-playing__artist">
              {this.state.item.artists[0].name}
            </div>
            <div className="now-playing__status">
              {this.state.is_playing ? "Playing" : "Paused"}
            </div>
            <div className="progress">
              <div className="progress__bar" style={this.state.progressBarStyles} />
            </div>
          </div>
          <div className="background" style={this.state.backgroundStyles} />{" "}
        </div >
      </div >
    );
  }
}

export default Player;
