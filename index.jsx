/* globals chrome */
import React from 'react';
import EventEmitter from 'events';
import 'whatwg-fetch';
import _ from 'lodash';

var distance = require('gps-distance');


Parse.initialize("tDIszEasIJ8ebuKIaV5QMlkcliRCSDDzJT7IoVTk", "UfWlYnlNUDrv6PquJzNzEDSShtahXJXH6XsXnwTV");

const control = new EventEmitter();

class UrlBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      inputValue: ''
    };
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      control.emit('new-site-input', {
        site: e.target.value
      });
      e.target.value = '';
    }
  }

  clear() {
    this.setState({
      inputValue: ''
    });
  }

  _onChange(e) {


    this.setState = {
      inputValue: e.target.value
    };

  }

  render() {
    return (
      <div style={{
        flex: 1,
        height: '3em',
        display: 'flex'
      }}>

        <input onKeyDown={this._onKeyDown} ref="siteInput" onChange={this._onChange} placeholder="Type a site url to limit..." style={{

          fontWeight: 300,
          height: '100%',
          width: '40%',
          margin: 'auto',
          display: 'block',
          border: 0,
          borderRadius: '2px',
          outline: 'none',
          fontSize: '1.3em',
          background: 'rgba(255, 255, 255, .27)',
          color: 'white',
          padding: '1em'
        }}> </input>
      </div>
    );
  }
}

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        position: 'fixed',
        top: '0',
        alignItems: 'center',
        justifyContent: 'center',
        height: '5em',
        width: '100%',
        boxShadow: '0 0 10px rgba(0, 0, 0, .5)',
        backgroundColor: '#2E3B43',
        color: 'white',
      }}>
        <UrlBar />
      </div>
    );
  }
}

class BlockedSites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.sites[0]);
    return (

      <div style={{
        position: 'relative',
        top: '8em',
        width: '40vw',
        margin: 'auto',
        background: 'white',
        borderRadius: '2px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, .3)'
      }}>
        {
          this.props.sites.map((site, i) => {
            return (
              <div key={i} style={{
                padding: '1em'
              }}>
                {site.url}
              </div>
            );
          })
        }
      </div>
    );
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0px 5px 5px rgba(0, 0, 0, .27)',
        width: '40vw',
        margin: 'auto',
        position: 'relative',
        top: '7em'
      }}>

          <img style={{
            maxWidth: '40%'
          }} src="http://marcobarragan.com/images/me_formal.jpg" />

      </div>
    );
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      inputValue: ''
    };
  }

  _onChange(e) {

    // Get the value from the input
    this.setState = {
      inputValue: e.target.value
    };

  }


  _onKeyDown(e) {
    if (e.key === 'Enter') {
      control.emit('new-id-input', {
        id: e.target.value
      });
      e.target.value = '';
    }
  }

  _submit(e) {
    console.log(this.refs.username.getDOMNode().value);
    console.log(e.target.value);
    if (e.key === 'Enter') {
      control.emit('login-user', {
        username: this.refs.username.getDOMNode().value,
        password: e.target.value
      });
    }
  }

  _onKeyDownUserName() {

  }

  render() {

    var dom = (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: 10,
        display: 'flex'
      }}>
        <div style={{
          margin: 'auto',
          width: '50vw',
          height: '40vh',
          background: 'transparent'
        }}>

          <div style={{
            padding: '3em 1em 3em 1em',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: 'black',
            borderRadius: '3px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, .27)'
          }}>
            <input style={{
              width: '90%',
              margin: 'auto',
              color: 'white',
              background: 'rgba(255, 255, 255, .15)',
              padding: '1em',
              border: 'none',
              outline: 'none',
              fontSize: '1.5em'
            }}
            onKeyDown={this._onKeyDown} onChange={this._onChange} placeholder="Type in ID"></input>
            <div style={{
              color: 'white',
              fontSize: '2em',
              textAlign: 'center',
              padding: '1em 0em 2em 0em'
            }}>OR</div>
            <input ref="username" style={{
              width: '90%',
              margin: 'auto',
              color: 'white',
              background: 'rgba(255, 255, 255, .15)',
              padding: '1em',
              border: 'none',
              outline: 'none',
              fontSize: '1.5em'
            }}
            onKeyDown={this._onKeyDownUserName} onChange={this._onChange} placeholder="username"></input>
            <input ref="password" style={{
              width: '90%',
              margin: 'auto',
              color: 'white',
              background: 'rgba(255, 255, 255, .15)',
              padding: '1em',
              border: 'none',
              outline: 'none',
              fontSize: '1.5em'
            }}
            onKeyDown={this._submit.bind(this)} onChange={this._onChange} placeholder="password" type="password"></input>
            <button style={{
              flex: 1,
              width: '90%',
              margin: 'auto',
              color: 'white',
              background: 'red',
              outline: 'none',
              border:'none',
              height: '40vh',
              display: 'block',
              fontSize: '5em'
            }}>Login</button>
          </div>
        </div>
      </div>
    );

    return this.props.visible ? null : dom;
  }
}

class FreeTime extends React.Component {
  constructor(props) {
    super(props);
  }
  _onClick() {
    control.emit('start-timer');
  }
  render() {
    return (
      <div style={{
        padding: '1em',

        display: 'flex',
        height: '12vh',
        width: '40vw',
        background: 'white',
        margin: 'auto',
        top: '12vh',
        position: 'relative',
        boxShadow: '0 2px 5px rgba(0, 0, 0, .27)'
      }}>
        <span style={{
          fontSize: '3em',
          margin: 'auto'
        }}>{this.props.time} mins</span>
        <button style={{
          border: 'none',
          outline: 'none',
          background: '#359AD8',
          color: 'white',
          padding: '1em',
          fontSize: '1.3em',
          borderRadius: '3px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, .27)'

        }}
        onClick={this._onClick}
        >Start Free Time</button>
      </div>
    );
  }
}

class App extends React.Component {



  constructor (props) {
    super(props);

    control.on('login-user', (payload) => {
      var self = this;
      Parse.User.logIn(payload.username, payload.password, {
        success: function(user) {
          console.log('success');
          console.log(user.get('points'));
          console.log(user.id);
          self.setState({
            type: 'android',
            _id: user.id,
            points: user.get('points'),
            blocked: user.get('blocked')
          });
        },
        error: function(user, error) {
          console.log(arguments);
        }
      });
    });

    control.on('start-timer', () => {
      var refreshIntervalId = setInterval(() => {
        var self = this;
        if (this.state.points !== 0) {
          chrome.runtime.sendMessage({
            shouldBlock: false,
            type: 'shouldBlock'
          });
          var oldPoints = this.state.points;

          var User;
          if (this.state.type === 'android') {
            User = Parse.Object.extend('User');
          } else {
            User = Parse.Object.extend('Users');
          }


          var newUser = new User();
          newUser.id = this.state._id;

          newUser.set('points', oldPoints - 1);

          newUser.save(null, {
            success: function() {
              self.setState({
                points: --oldPoints
              });
            },
            error: function(err) {
              alert(err);
            }
          })
        } else {


          chrome.runtime.sendMessage({
            shouldBlock: true,
            type: 'shouldBlock'
          });

        }
      }, 1000 * 2);
    });
    control.on('new-user', (payload) => {
      var User = Parse.Object.extend('Users');
      var newUser = new User();
      newUser.id = payload._id;
      newUser.set('points', payload.points);
      var self = this;
      newUser.save(null, {
        success: function() {
          self.setState(payload);
          chrome.runtime.sendMessage({
            blocked: self.state.blocked,
            type: 'blocked'
          });

        },
        error: function(err) {
          console.log(err);
        }
      });
    });

    control.on('new-id-input', (payload) => {
      var User = Parse.Object.extend('Users');
      var query = new Parse.Query(User);
      var self = this;

      query.equalTo('uuid', payload.id);
      query.find({
        success: function(results) {
          if (results.length !== 1) {
            alert('Invalid Id');
          } else {
            var user = results[0];
            console.log(user);
            var gps_coords = user.get('gps_coords');
            var result = distance(gps_coords);
            var ftInKm = 3280.84

            var time = ((result * ftInKm) / 300) * 10;


            var loggedInUser = {
              _id: user.id,
              uuid: user.get('uuid') || undefined,
              points: Math.floor(time),
              blockMode: user.get('blockMode') || false,
              blocked: user.get('blocked') || [],
              gps_coords: user.get('gps_coords') || []
            };
            console.log(loggedInUser);
            control.emit('new-user', loggedInUser);
          }
        },
        error: function(err) {
          alert('Invalid');
        }
      });
    });
    control.on('new-site-input', (payload) => {

      var User;
      if (this.state.type === 'android') {
        User = Parse.Object.extend('User');
      } else {
        User = Parse.Object.extend('Users');
      }
      var newUser = new User();
      newUser.id = this.state._id;


      const url = `http://${payload.site}`;
      const toSave = payload.site.replace('http://', '')
        .replace('https://', '').replace('www.', '').replace('.com', '')
        .replace('.net', '').replace('.org','').replace('.edu', '');
      var oldBlocked = this.state.blocked;
      var exists = false;

      oldBlocked.forEach((site) => {
        console.log(site.url, toSave);
        if (site.url.indexOf(toSave) !== -1) {
          exists = true;
        };
      });

      if (exists) {
        return;
      }
      fetch(url)
        .then((res) => {
          oldBlocked.unshift({
            url: toSave
          });
          this.setState({
            blocked: oldBlocked
          });
          var self = this;
          newUser.set('blocked', this.state.blocked);
          newUser.save(null, {
            success: function(point) {
              chrome.runtime.sendMessage({
                blocked: self.state.blocked,
                type: 'blocked'
              });
            },
            error: function(err) {
              console.log('Error!');
            }
          });


        })
        .catch((err) => {
          alert('This is not a valid url');
        });
    });
    this.state = {
      _id: '',
      uuid: undefined,
      points: 0,
      blockMode: false,
      blocked: []
    };
  }

  render() {
    var visible = this.state._id ? true : false;
    console.log(this.state.uuid, visible);
    return (
      <div>
        <Login visible={visible}/>

        <ActionBar />
        <FreeTime time={this.state.points}/>
        <BlockedSites sites={this.state.blocked}/>
      </div>
    );
  }
}

/**
 * Make sure it's a valid url by ajax request.
 */

React.render(
  <App />,
  document.getElementById('root')
);
