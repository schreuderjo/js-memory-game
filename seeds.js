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

var futuramaDeck = [
  {name: "Fry", img: "fry.jpeg"},
  {name: "Bender", img: "bender.jpeg"},
  {name: "Leela", img: "leela.jpeg"},
  {name: "Zoidberg", img: "zoidberg.jpeg"},
  {name: "Amy", img: "amy.jpeg"},
  {name: "Professor", img: "professor.jpeg"},
  {name: "Zapp", img: "zapp.jpeg"},
  {name: "Hermes", img: "hermes.jpeg"},
  {name: "Kiff", img: "kiff.jpeg"},
  {name: "Scruffy", img: "scruffy.jpeg"},
  {name: "Nibbler", img: "nibbler.jpeg"},
  {name: "Calculon", img: "calculon.jpeg"},
  {name: "Mom", img: "mom.jpeg"},
  {name: "Cubert", img: "cubert.jpeg"},
  {name: "Hypnotoad", img: "hypnotoad.jpeg"},
  {name: "Lrrr", img: "lrrr.jpeg"}
];

function shuffle(array){
  var shuffledArray = [];
  var limit = array.length;
  var randomIndex;

  while (array.length !== 0) {
    randomIndex = Math.floor(Math.random()*limit);
    shuffledArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
    limit = array.length;
  }
  return shuffledArray;
}