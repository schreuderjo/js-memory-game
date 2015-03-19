var currentGame;

Meteor.subscribe("cards");
Meteor.subscribe("players");
Meteor.subscribe("games");

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

  currentGame: function(){
    return Games.find({});
  }
});

Template.cardsRow.helpers({
  row: function() {
      return this;
  }
});

Template.card.helpers({
    card: function() {
      return this;
    }
});

Template.body.helpers({
  currentGame: function(){
    return Session.get("currentGame");
  }
});

Template.body.events({
  "click .card": function(event){
    event.preventDefault();
    console.log("wooo");
    var selectedCardId = event.target.id
    var currentPlayer;
    // Meteor.call("findCard", )
  },

  "click .new-game": function(event){
    event.preventDefault();
    Meteor.call("newGame");
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