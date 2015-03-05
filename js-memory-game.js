function Game(){
  this.players = [];
  this.solved = false;
  this.rounds = 0;
  this.turn = 0;
}

function Turn(){
  this.targetOne;
  this.targetTwo;
}

function Player(name){
  this.name = name;
  this.score = 0;
  this.turns = [];
}

Player.prototype.takeTurn = function(){
  currentTurn = new Turn();
}

Game.prototype.addPlayer = function(name){
  var newPlayer = new Player(name);
  this.players.push(newPlayer);
}

var currentGame;

if (Meteor.isClient) {
  Meteor.subscribe("cards");
  Meteor.subscribe("players");

  Template.body.helpers({
    cards: function() {
      var deck = Deck.find({}).fetch();
      var shuffledArray = [];
      var limit = deck.length;
      var randomIndex;
      var chunks = [];

      var clonedDeck = deck.slice(0);
      var doubledDeck = deck.concat(clonedDeck);

      while (doubledDeck.length !== 0) {
        randomIndex = Math.floor(Math.random()*limit);
        shuffledArray.push(doubledDeck[randomIndex]);
        doubledDeck.splice(randomIndex, 1);
        limit = doubledDeck.length;
      }

      while (shuffledArray.length > 0) {
        chunks.push(shuffledArray.slice(0, 8));
        shuffledArray = shuffledArray.slice(8);
      }
      return chunks;
    },

    players: function() {
      return Players.find({});
    },

    gameStarted: function(){
      // return currentGame.started;
    }
  });

  Template.cardsRow.helpers({
    row: function() {
        // console.log(this); // a chunk of cards
        return this;
    }
  });

  Template.card.helpers({
      card: function() {
        // console.log(this); // a number in a chunk
        return this;
      }
  });

  Template.body.events({
    "click .card": function(event){
      event.preventDefault();
      console.log("wooo");
      var selectedCardId = event.target.id
      var currentPlayer;
      debugger;
      // Meteor.call("findCard", )
    },

    "click .new-game": function(event){
      event.preventDefault();
      currentGame = new Game();
      console.log(currentGame);
    }
  });

  Template.addPlayerForm.events({
    "submit form": function(event) {
      event.preventDefault();
      var playerName = event.target.playerName.value;
      // Meteor.call("addPlayer", playerName);
      currentGame.addPlayer(playerName);
      console.log(currentGame);
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
  addPlayer: function(name){
    currentGame.addPlayer(name);
    Players.insert({
      name: name,
      score: 0,
      createdAt: new Date()
    });
  },

  createDeck: function(cards){
    for (var i=0; i<cards.length; i++) {
      Deck.insert({
        name: cards[i].name,
        img: cards[i].img,
        createdAt: new Date()
      });
    }
  }
});
