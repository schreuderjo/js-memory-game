// function shuffle(array){
//   var shuffledArray = [];
//   var limit = array.length;
//   var randomIndex;

//   while (array.length !== 0) {
//     randomIndex = Math.floor(Math.random()*limit);
//     shuffledArray.push(array[randomIndex]);
//     array.splice(randomIndex, 1);
//     limit = array.length;
//   }
//   return shuffledArray;
// }

if (Meteor.isClient) {
  Meteor.subscribe("cards");
  Meteor.subscribe("players");

  // Template.gameBoard.helpers({
  //   cards: function() {
  //     var allCards = Deck.find({}).fetch();
  //     console.log(allCards);
  //     var rows = [];

  //     while (allCards.length > 0) {
  //       rows.push(allCards.slice(0, 4));
  //       allCards = allCards.slice(4);
  //       console.log(rows);
  //     }
  //     return rows;
  //   }
  // });


  Template.body.helpers({
    cards: function() {
      var array = Deck.find({}).fetch();
      var shuffledArray = [];
      var limit = array.length;
      var randomIndex;
      var chunks = [];

      while (array.length !== 0) {
        randomIndex = Math.floor(Math.random()*limit);
        shuffledArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
        limit = array.length;
      }

      while (shuffledArray.length > 0) {
        chunks.push(shuffledArray.slice(0, 4));
        shuffledArray = shuffledArray.slice(4);
      }
      return chunks;
    },

    players: function() {
      return Players.find({});
    },

    gameStarted: function(){
      return currentGame.started;
    }
  });

  Template.cardsRow.helpers({
    row: function() {
        // console.log(this); // a chunk of cards
        return this;
    }
  });

  Template.card.helpers({
      img: function() {
        // console.log(this); // a number in a chunk
        return this.img;
      }
  });

  Template.body.events({
    // "click .new-game": function (event) {
    //   event.preventDefault();
    //   var currentGame = new Game();
    //   currentGame.started = true;
    //   $("container").html(Blaze.render(Template.gameBoard));

    //   // return false;
    // }
    "click .card": function(event){
      event.preventDefault();
      console.log("wooo");
      Meteor.call('sendLogMessage');
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
        name: cards[i].name,
        img: cards[i].img,
        createdAt: new Date()
      });
    }
  },

  'sendLogMessage': function(){
    console.log("Hello world");
  }
});
