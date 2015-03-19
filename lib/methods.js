Meteor.methods({
  addPlayer: function(name){
    var game = Session.get("currentGame")
    debugger;
    Players.insert({
      game_id: id,
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

  newGame: function(){
    Games.insert({
      players: [],
      winner: null,
      turn: 0,
      createdAt: new Date()
    });
  }
});
