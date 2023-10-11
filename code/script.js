function sound(src) {   // creating an object for non looping sound effects
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function soundo(src) {    // creating an object for looping background music
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("loop", true);
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// creating variables to hold the different sounds from the 'sounds' folder
life = new sound("sounds/life.mp3");
lose = new sound("sounds/lose.mp3");
minus = new sound("sounds/minus.mp3");
plus = new sound("sounds/plus.mp3");
run = new sound("sounds/run.mp3");
two = new sound("sounds/two.mp3");
win = new sound("sounds/win.mp3");
music = new soundo("sounds/music.mp3");

// defining functions that open and close different UI elements

function openInstructions(){
  document.getElementById("instructions").style.height = "100%";
}

function closeInstructions(){
  document.getElementById("instructions").style.height = "0";
}

function openCustomize(){
  document.getElementById("customize").style.height = "100%";
}

function closeCustomize(){
  document.getElementById("customize").style.height = "0";
}

function openSettings(){
  document.getElementById("settings").style.height = "100%";
}

function closeSettings(){
  document.getElementById("settings").style.height = "0";
}

function openLeaderboard(){
  document.getElementById("leaderboard").style.height = "100%";
}

function closeLeaderboard(){
  document.getElementById("leaderboard").style.height = "0";
}

function saveSettings()
{
  if (document.getElementById("music-toggle").checked == false)
  {
    music_setting = false;
    music.stop();
  }
  else
  {
    music_setting = true;
    music.play();
  }
  if (document.getElementById("sound-toggle").checked == false)
  {
    sound_setting = false;
  }
  else
  {
    sound_setting = true;
  }
}

function openLose(){
  document.getElementById("final-score").innerHTML = current_score;
  document.getElementById("lose").style.height = "100%";
  music.stop();
  if (sound_setting) two.play();
  if (classic) document.getElementById("savebtnlose").style.display = "block";
  else document.getElementById("savebtnlose").style.display = "None";
}

function closeLose(){
  document.getElementById("lose").style.height = "0";
}

function openWin(){
  document.getElementById("final-score-win").innerHTML = current_score;
  document.getElementById("win").style.height = "100%";
  music.stop();
  if (sound_setting) win.play();
  if (classic) document.getElementById("savebtnwin").style.display = "block";
  else document.getElementById("savebtnwin").style.display = "None";
}

function closeWin(){
  document.getElementById("win").style.height = "0";
}

function openLife(){
  document.getElementById("life").style.height = "100%";
  if (sound_setting) life.play();
}

function closeLife(){
  document.getElementById("life").style.height = "0";
}

function openMinus(){
  document.getElementById("minus").style.height = "100%";
  if (sound_setting) minus.play();
}

function closeMinus(){
  document.getElementById("minus").style.height = "0";
}

function openPlus(){
  document.getElementById("plus").style.height = "100%";
  if (sound_setting) plus.play();
}

function closePlus(){
  document.getElementById("plus").style.height = "0";
}

function openLifeused(){
  document.getElementById("lifeused").style.height = "100%";
  if (sound_setting) life.play();
}

function closeLifeused(){
  document.getElementById("lifeused").style.height = "0";
}

function openTwo(){
  document.getElementById("two").style.height = "100%";
  if (sound_setting) lose.play();
}

function closeTwo(){
  document.getElementById("two").style.height = "0";
}

function customSave(){    // to take custom field size and number of fielders as input from the user
  size = document.getElementById("quantity").value;
  num_fielders = document.getElementById("quantity1").value;
  if (size == 7 && num_fielders==11) classic = true;
  else classic = false;
  makeGrid();
}

function classicSave(){   // directly overwrites custom field and sets a 7x7 grid with 11 fielders
  size = 7;
  num_fielders = 11;
  classic = true;
  makeGrid();
}

function openSaveL(){
  document.getElementById("savel").style.height = "100%";
}

function closeSaveL(){
  document.getElementById("savel").style.height = "0";
}

function compare(a, b)    // function to compare scores of different players whose data is stored in playerArray (for setting leaderboard)
{
  return b.score - a.score;
}

// function to take player's name and score, add them to the array of players and reset the leaderboard according to the updated array
function saveSaveL(){   
  player_name = document.getElementById("name0").value;
  document.getElementById("name0").value="";
  player_obj = {name:player_name, score:current_score};
  playerArray.push(player_obj);
  setLeaderBoard();
  closeSaveL();
}

// function to identify and set the top 5 scores on the leaderboard 
function setLeaderBoard(){
  playerArray.sort(compare);
  document.getElementById("name1").innerHTML = playerArray[0].name;
  document.getElementById("score1").innerHTML = playerArray[0].score;
  document.getElementById("name2").innerHTML = playerArray[1].name;
  document.getElementById("score2").innerHTML = playerArray[1].score;
  document.getElementById("name3").innerHTML = playerArray[2].name;
  document.getElementById("score3").innerHTML = playerArray[2].score;
  document.getElementById("name4").innerHTML = playerArray[3].name;
  document.getElementById("score4").innerHTML = playerArray[3].score;
  document.getElementById("name5").innerHTML = playerArray[4].name;
  document.getElementById("score5").innerHTML = playerArray[4].score;
}

// function to randomize the order of elements in an array; I have used this to allot different runs / fielders / power-ups to the cells
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// DECLARING ALL THE VARIABLES:
// num_power - to hold the number of power-ups (4 or 8 according to grid size) 
// click - number of balls the player has to finish to win
// num_empty - to hold the number of empty cells after distributing fielders and power-ups
// arr_fielders, arr_powerups, arr_runs, arr_occupied - arrays to hold the positions of cells containing filders, power-ups, runs, and non empty cells respectively
// num_ones, num_twos, num_threes - to hold the number of cells with run values 1, 2, 3 respectively
// current_score - to hold the current score of the player
// extra_life - boolean variable to check whether the player has obtained an extra life power-up or not
// out - to check if the game has ended
// size, num_fielders - to hold the number of squares on each side of the grid and number of fielders respectively
// music_setting - to remember if music should be on/off for the next game
// sound_setting - to remember if sound effects should be on/off for the next game
// playerArray - array of objects holding name and score of all players

var grid = document.getElementById("grid");
var out, num_power, click, num_empty, arr_fielders, arr_occupied, arr_powerups, arr_runs, occupied, num_ones, num_threes, num_twos, current_score, extra_life;
var size = 7;
var num_fielders = 11;
var player_name;
var scores_map = new Map ([[5, "player1"], [1, "player2"], [10, "player3"], [14, "player4"], [3, "player5"]]);
var music_setting = true;
var sound_setting = true;
var classic = true;
var playerArray = [   // dummy values to be set prior to starting the game
  {name:"Player1", score: 4},
  {name:"Player2", score: 10},
  {name:"Player3", score: 1},
  {name:"Player4", score: 8},
  {name:"Player5", score: 6},
]

document.getElementById("current-score").innerHTML = 0;
document.getElementById("current-balls").innerHTML = click;

makeGrid();   // generating the grid based on field size and number of fielders given by the player
if (music_setting) music.play();

function makeGrid() {
  if (music_setting) music.play();
  grid.innerHTML="";
  for (var i=0; i<size; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<size; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var fielder = document.createAttribute("data-fielder");   // creating attributes to identify if the cell contains fielders, power-ups or runs
      var fielder = document.createAttribute("data-runs");       
      var fielder = document.createAttribute("power");       
      fielder.value = "false";             
      cell.setAttributeNode(fielder);
    }
  }
  document.getElementById("num-fielders").innerHTML = num_fielders;   // displays number of fielders in top left corner
  if (size <=7) num_power = 4;    // setting the number of power-ups depending on the field size
  else num_power = 8;
  num_empty = size*size - num_fielders - num_power;
  click= num_empty;
  num_twos = Math.floor(num_empty*0.25);    // rough run allocation - 15% 3s, 25% 2s, remaining 1s
  num_threes = Math.floor(num_empty*0.15);
  num_ones = num_empty - num_twos - num_threes;
  // initializing all the values for the new game
  current_score=0;
  extra_life=false;
  occupied=[];
  arr_fielders=[];
  arr_powerups=[];
  arr_runs=[];
  arr_occupied=[];
  out = false;  
  document.getElementById("current-balls").innerHTML = click;
  if (classic) num_fielders = 11;
  document.getElementById("num-fielders").innerHTML = num_fielders;
  document.getElementById("current-score").innerHTML = current_score;
  addFielders();
  addPowerups();
  addRuns();
  setLeaderBoard();
}

function addFielders() {
  occupied = [];
  var c=0;
  for (var i=0; i<size; ++i)
  {
    for (var j=0; j<size; ++j)
    {
      occupied[i*size+j]=[i, j];
    }
  }
  shuffle(occupied);    // now we have an array of all possible coordinates, in a random order
  while(c!=num_fielders)
  {
    c++;
    pos = occupied.pop();   // a random coordinate gets removed from unoccupied...
    arr_occupied.push(pos);   // and inserted into occupied
    arr_fielders.push(pos);   // and will contain a fielder
    var row = pos[0];
    var col = pos[1];
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-fielder","true");   // setting the fielder attribute to true
    if (out) cell.innerHTML="X";
  }
}

function addPowerups()
{
  // now the array unoccupied contains a randomized list of all empty cells. We can distribute the power-ups among any of these, following the same logic as in addFielders
  // we set the power attribute value accordingly

  var t=num_power/4;
  while(t--)
  {pos = occupied.pop();
  arr_occupied.push(pos);
  arr_powerups.push(pos);
  var row = pos[0];
  var col = pos[1];
  var cell = grid.rows[row].cells[col];
  cell.setAttribute("power", "life")

  pos = occupied.pop();
  arr_occupied.push(pos);
  arr_powerups.push(pos);
  var row = pos[0];
  var col = pos[1];
  var cell = grid.rows[row].cells[col];
  cell.setAttribute("power", "minus")
  
  pos = occupied.pop();
  arr_occupied.push(pos);
  arr_powerups.push(pos);
  var row = pos[0];
  var col = pos[1];
  var cell = grid.rows[row].cells[col];
  cell.setAttribute("power", "two")  
  
  pos = occupied.pop();
  arr_occupied.push(pos);
  arr_powerups.push(pos);
  var row = pos[0];
  var col = pos[1];
  var cell = grid.rows[row].cells[col];
  cell.setAttribute("power", "plus")
}
}

function addRuns() {
  // again using the same logic, we allot runs to the remaining cells in unoccupied and set their runs attribute value accordingly
  for (var i=0; i<num_ones; ++i)
  {
    var position = occupied.pop();
    arr_runs.push(position);
    var row = position[0];
    var col = position[1];
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-runs", 1);
  }
  for (var i=0; i<num_twos; ++i)
  {
    var position = occupied.pop();
    arr_runs.push(position);
    var row = position[0];
    var col = position[1];
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-runs", 2);
  }
  for (var i=0; i<num_threes; ++i)
  {
    var position = occupied.pop();
    arr_runs.push(position);
    var row = position[0];
    var col = position[1];
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-runs", 3);
  }
}

function displayRun(cell)
{
  // according to the the value of the runs attribute, the cell will display the image of the number when the user clicks on it.
  // the value will also be added to the current score
  var x = cell.getAttribute("data-runs");
  if (x==1)
  {
    current_score++;
    cell.innerHTML= '<img src="images/1.png" class = "cell-icon"> </img>'; 
  }
  
  else if (x==2)
  {
    current_score++;
    current_score++;
    cell.innerHTML= '<img src="images/2.png" class = "cell-icon"> </img>';
  }
  else if (x==3)
  {
    current_score++;
    current_score++;
    current_score++;
    cell.innerHTML= '<img src="images/3.png" class = "cell-icon"> </img>';   
  }

  y = cell.getAttribute("power")    // checking if the cell contains a power-up and modifying variables accordingly

  if (y=="life")
  {
    extra_life = true;
    cell.innerHTML= '<img src="images/heart.png" class = "cell-icon"> </img>';
    window.setTimeout(openLife, 500); 
    window.setTimeout(closeLife, 2000); 
  }

  else if (y=="minus")
  {
    num_fielders--;
    document.getElementById("num-fielders").innerHTML=num_fielders;
    var chosen = arr_fielders.pop();
    var chosen_cell = grid.rows[chosen[0]].cells[chosen[1]];
    chosen_cell.setAttribute("data-fielder", false);
    chosen_cell.setAttribute("data-runs", 1);
    chosen_cell.innerHTML = "";
    click++;
    document.getElementById("current-balls").innerHTML = click;
    cell.innerHTML= '<img src="images/baseball-cap.png" class = "cell-icon"> </img>'; 
    window.setTimeout(openMinus, 500); 
    window.setTimeout(closeMinus, 2000);   
  }

  else if (y=="two")
  {
    current_score--; current_score--;
    cell.innerHTML= '<img src="images/number.png" class = "cell-icon"> </img>';
    window.setTimeout(openTwo, 500); 
    window.setTimeout(closeTwo, 2000);    
  }
  else if (y=="plus")
  {
    num_fielders++;
    document.getElementById("num-fielders").innerHTML=num_fielders;
    var chosen = arr_runs.pop();
    var chosen_cell = grid.rows[chosen[0]].cells[chosen[1]];
    chosen_cell.setAttribute("data-fielder", true);
    if (out) cell.innerHTML="X";
    click--;
    document.getElementById("current-balls").innerHTML = click;
    cell.innerHTML= '<img src="images/cap.png" class = "cell-icon"> </img>';
    window.setTimeout(openPlus, 500); 
    window.setTimeout(closePlus, 2000);  
  }  

  document.getElementById("current-score").innerHTML = current_score;
  // setting the updated score after clicking on each cell
}

function revealFielders() {
  // function to display all the fielders in the grid if the player clicks on a cell containing a fielder
  var fielder_count=-1;
  for (var i=0; i<size; i++) {
    for(var j=0; j<size; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-fielder")=="true") 
      {
        fielder_count+=1;
        cell.className="fielder";
        document.getElementsByClassName("fielder")[fielder_count].innerHTML = '<img src="images/player.png" class = "cell-icon"> </img>';
      }
    }
  }
}

function checkLevelCompletion() {
  // function to check if the game has been completed
  var levelComplete = true;
  for (var i=0; i<size; i++) {
    for(var j=0; j<size; j++) {
      if ((grid.rows[i].cells[j].getAttribute("data-fielder")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
    }
  }
}

function clickCell(cell) {
  if (sound_setting) run.play();
  var ups = ["life", "plus", "minus", "two"];
  if (!(ups.includes(cell.getAttribute("power")))) click--;
  document.getElementById("current-balls").innerHTML = click;
  if (cell.getAttribute("data-fielder")=="true") {
    if (extra_life==false)
    { // player has lost. fielders are revealed and game ends 
      revealFielders();
      window.setTimeout(openLose, 1500);
    }
    else  // the player has an extra life
    {
      extra_life = false;   // removing the extra life
      num_fielders--;
      click++;
      document.getElementById("num-fielders").innerHTML = num_fielders;
      cell.style.background = "#c2b279";
      cell.innerHTML='<img src="images/player.png" class = "cell-icon"> </img>';  // displaying only that particular fielder
      window.setTimeout(openLifeused, 500); 
      window.setTimeout(closeLifeused, 2000);
    }
  }
  else  // no fielders, runs / power-ups are displayed 
  {
    cell.className = "clicked";
    displayRun(cell);
  }
  if (click==0)
  {
    // player has won. 6 runs are added to the final score and game ends
    current_score+=6;
    window.setTimeout(openWin, 1000);
  } 
  checkLevelCompletion();
}
