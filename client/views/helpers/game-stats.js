Template.gameStats.helpers({
  'round': function(){
    var allGames = Games.find().fetch();
    var lastGame = allGames[allGames.length - 1];
    console.log(lastGame);
    return lastGame.round;
  }
});