Template.gameStats.helpers({
  'round': function(){
    var currentGame = Session.get('currentGame');
    return currentGame.round;
  }
});