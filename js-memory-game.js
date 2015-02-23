Deck = new Mongo.Collection("cards");
Players = new Mongo.Collection("players");

function Game(){
  this.started = false;
  this.players = 0;
  this.solved = false;
  this.winner;
}

function Player(name){
  this.name = name;
  this.score = 0;
}

var futuramaDeck = ["Bender", "Leela", "Fry", "Zoidberg", "Amy", "Professor", "Zapp Brannigan", "Hermes", "Kiff", "Scruffy", "Nibbler"];

if (Meteor.isClient) {
  Meteor.subscribe("cards");
  Meteor.subscribe("players");

  Template.body.helpers({
    cards: function () {
      return Deck.find({});
    },
    players: function() {
      return Players.find({});
    },
    gameStarted: function(){
      return currentGame.started;
    }
  });

  Template.body.events({
    "click .new-game": function (event) {
      var currentGame = new Game();
      currentGame.started = true;
      return false;
    }
  });

  Template.addPlayerForm.events({
    "submit form": function(event) {
      event.preventDefault();
      var playerName = event.target.playerName.value;
      Meteor.call("addPlayer", playerName);
      event.target.playerName.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Deck.find().count() === 0) {
      Meteor.call("createDeck", futuramaDeck);
    }
  });

  Meteor.publish("cards", function () {
    return Deck.find();
  });

  Meteor.publish("players", function () {
    return Players.find();
  });
}

Meteor.methods({
  addPlayer: function(name) {
    Players.insert({
      name: name,
      score: 0,
      createdAt: new Date()
    });
  },

  createDeck: function(cards){
    for (var i=0; i<cards.length; i++) {
      Deck.insert({
        text: cards[i],
        createdAt: new Date()
      });
    }
  }
});
