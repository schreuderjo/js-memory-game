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

Meteor.publish("games", function () {
  return Games.find();
});


