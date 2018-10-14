import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Players} from '../imports/api/players';
import {Tracker} from 'meteor/tracker';

const renderPlayers = (playersList) => {
  return playersList.map(player =>
    <p key={player._id}>
      <li>{player.name}! has {player.score} point(s).</li>
    </p> );  
};

const handleSubmit = (e) => {
  e.preventDefault();
  let playerName = e.target.playerName.value;
  
  if (playerName) {
    e.target.playerName.value = '';
    Players.insert({
      name: playerName,
      score: 0
    });
  }

}

Meteor.startup(function () {
  let title = 'Score Keep';
  let name = 'Mike';
 
  Tracker.autorun( () => {
    let players = Players.find().fetch();
    
    let jsx = (
      <div>
        <h1>{title}</h1>
        <p>Hello {name}</p>
        {renderPlayers(players)}
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name"/>
          <button>Add player</button>
        </form>
      </div>
    );

    ReactDOM.render(
      jsx,
      document.getElementById('app'));
    }
  );

});
