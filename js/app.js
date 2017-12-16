//Create a list that holds all of your cards
let cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt',
             'cube', 'leaf', 'bicycle','bomb',
             'diamond', 'paper-plane-o', 'anchor', 'bolt',
             'cube', 'leaf', 'bicycle','bomb'];

let moves=0;
let clock = 0;
let timer;
let openCards = [];

beginGame();

// Restart the game.
function restart(){
  moves = 0;
  clock = 0;
  openCards = [];
  clearInterval(timer);
  $('.card').remove();
  totalMoves(moves);
  beginGame();
}

// Start the Game.
function beginGame(){
  let newcards = shuffle(cards);
  let deck = $('.deck');
  $('.card').remove();
  for(let i=0;i<16;i++){
    deck[0].innerHTML+= '<li class="card"></li>';
  }
  let list = $('.card');
  for(let i=0;i<16;i++){
    list[i].innerHTML += '<i class="fa fa-' + newcards[i] + '"></i>';
  }
  clickFunction();
}

//Function for starting the clock.
function startClock(){
  timer = setInterval(function(){
    clock++;
    $('.time').text(clock + ' secs');
  },1000);
}


// Function for checking moves and stars to shown.
function totalMoves(move){
  stars = $('.fa-star');
  notStars = $('.fa-star-o');
  if(move%2==0){
    let exactMove = move/2;
    $('.moves').text(exactMove + ' moves');
  }
  if(move==0){
    for(i=0;i<notStars.length;i++){
      notStars[i].classList.add('fa-star');
      notStars[i].classList.remove('fa-star-o');
    }
  }
  else if(move==30){
    stars[2].classList.add('fa-star-o');
    stars[2].classList.remove('fa-star');
  }
  else if(move==40){
    stars[1].classList.add('fa-star-o');
    stars[1].classList.remove('fa-star');
  }
}

// Add click functionality to each cards and check if selected 2 cards match.
function clickFunction(){
  $('.card').click(function(){
    if( !( $(this).hasClass('match') || $(this).hasClass('open'))){
      $(this).addClass('open show');
      moves++;
      if(moves==1){
        startClock();
      }
      openCards.push($(this));
      if (openCards.length % 2 == 0) {
        setTimeout(checkCards, 300);
  	  }
    }

    totalMoves(moves);
  });
}

// Check the last two cards selected to see if they match or not.
function checkCards(){
  if (openCards[openCards.length - 2].html() == openCards[openCards.length - 1].html()) {
        openCards[openCards.length - 2].removeClass('open show');
        openCards[openCards.length - 2].addClass('match');
        openCards[openCards.length - 1].removeClass('open show');
        openCards[openCards.length - 1].addClass('match');
    } else {
        openCards[openCards.length - 1].removeClass('open show');
        openCards[openCards.length - 2].removeClass('open show');
        openCards.pop();
        openCards.pop();
    }
    if(openCards.length==16){
      stars = $('.fa-star');
      clearInterval(timer);
      let exactMove = moves/2;
      let message =   "Congratulations!, You won the game. " +
        "Moves taken = " + exactMove + " " +
        "Time taken = " + clock + " secs &" +
        " Stars earned = " + stars.length;
      alertify.confirm(message,function (e) {
        if (e) {
          restart();
        }
      }).set('labels', {ok:'Play Again', cancel:'I am Done'});
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
