Deck = new Mongo.Collection("cards");

function Game(){
  this.started = false;
}

var futuramaDeck = ["Bender", "Leela", "Fry", "Zoidberg", "Amy", "Professor", "Zapp Brannigan", "Hermes", "Kiff", "Scruffy", "Nibbler"];

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    cards: function () {
      return Deck.find({});
    },
    gameStarted: function(){
      return currentGame.started;
    }
  });

  Template.body.events({
    "click .new-game": function (event) {
      var currentGame = new Game();
      console.log("Let the games begin!!!");
      console.log(currentGame.started);
      currentGame.started = true;
      console.log(currentGame.started);
      // return false;
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
}

Meteor.methods({
  createDeck: function(cards){
    for (var i=0; i<cards.length; i++) {
      Deck.insert({
        text: cards[i],
        createdAt: new Date()
      });
    }
  }
});
