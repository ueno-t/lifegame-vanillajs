"use strict";
var GameDefinition = (function () {
    function GameDefinition(size) {
        this.size = size;
        this.board = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            this.board[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++)
                this.board[i][j] = new Cell(i, j, false);
        }
    }
    return GameDefinition;
})();
var Game = (function () {
    function Game(def) {
        var _this = this;
        this.size = def.size;
        this.gene = 0;
        this.board = this.deepCopy(def);
        nestedLoop(this.size, function (i, j) { _this.neighbors(i, j); });
    }
    Game.prototype.deepCopy = function (def) {
        var copied;
        copied = new Array(this.size);
        for (var i = 0; i < this.size; i++)
            copied[i] = new Array(this.size);
        nestedLoop(this.size, function (i, j) { copied[i][j] = new Cell(i, j, def.board[i][j].alive); });
        return copied;
    };
    Game.prototype.neighbors = function (i, j) {
        var neighbors = 0, row, col;
        for (var row = i - 1; row <= i + 1; row++) {
            for (var col = j - 1; col <= j + 1; col++) {
                if ((0 <= row && 0 <= col) && !(row == i && col == j) && (row < this.size && col < this.size)) {
                    if (this.board[row][col].alive)
                        neighbors++;
                }
            }
        }
        this.board[i][j].neighbors = neighbors;
        this.board[i][j].next();
    };
    Game.prototype.reload = function () {
        var _this = this;
        nestedLoop(this.size, function (i, j) { _this.neighbors(i, j); });
        nestedLoop(this.size, function (i, j) { _this.board[i][j].commit(); });
        this.gene++;
    };
    Game.prototype.load = function (id) {
        console.log(id);
    };
    return Game;
})();
var Cell = (function () {
    function Cell(row, col, alive) {
        this.row = row;
        this.col = col;
        this.alive = alive;
    }
    Cell.prototype.next = function () {
        this.reserve = this.alive
            ? (this.neighbors === 2 || this.neighbors === 3)
            : (this.neighbors === 3);
    };
    Cell.prototype.commit = function () {
        this.alive = this.reserve;
    };
    return Cell;
})();
function nestedLoop(size, func) {
    var i, j;
    for (i = 0; i < size; i++)
        for (j = 0; j < size; j++)
            func(i, j);
}
