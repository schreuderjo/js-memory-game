function Game(){
  this.players = [];
  this.solved = false;
  this.started = true;
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