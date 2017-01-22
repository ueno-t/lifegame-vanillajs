var def;
var game;
var boardsize = 128;
var cellsize = 10;
var counter;
var canvas;
var context;
var buttonNext;
var buttonAuto;
var buttonLoad;
var running;
var timer;
var interval = 100;
var Board = (function () {
    function Board() {
        def = new GameDefinition(boardsize);
        game = new Game(def);
        buttonNext = document.getElementById('buttonNext');
        buttonNext.addEventListener('click', next, false);
        buttonAuto = document.getElementById('buttonAuto');
        buttonAuto.addEventListener('click', auto, false);
        buttonLoad = document.getElementById('buttonLoad');
        buttonLoad.addEventListener('click', load, false);
        counter = document.createElement("p");
        counter.textContent = "gene: " + game.gene.toString();
        document.body.appendChild(counter);
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        canvas.width = boardsize * cellsize;
        canvas.height = boardsize * cellsize;
        canvas.addEventListener('click', canvasClick, false);
        document.body.appendChild(canvas);
        context.fillStyle = 'rgb(60, 60, 60)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        nestedLoop(def.size, function (i, j) { drawCell(game.board[i][j]); });
    }
    return Board;
})();
function drawCell(c) {
    context.fillStyle = c.alive ? 'rgb(156, 255,0)' : 'rgb(40,40,40)';
    context.fillRect(c.col * cellsize, c.row * cellsize, cellsize - 1, cellsize - 1);
}
function canvasClick(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var row = Math.floor(x / cellsize);
    var col = Math.floor(y / cellsize);
    var c = game.board[col][row];
    c.alive = c.alive ? false : true;
    drawCell(c);
}
function next() {
    game.reload();
    nestedLoop(def.size, function (i, j) { drawCell(game.board[i][j]); });
    counter.textContent = "gene: " + game.gene.toString();
}
function auto() {
    if (running) {
        clearInterval(timer);
        buttonAuto.value = "start";
        running = false;
    }
    else {
        next();
        timer = setInterval('next()', interval);
        buttonAuto.value = "stop";
        running = true;
    }
}
function load() {
    game.load("test");
}
function exec() {
    var board = new Board();
}
exec();
