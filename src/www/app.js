var Cm2k15;
(function (Cm2k15) {
    var GameTile = (function () {
        function GameTile(row, col, size, element) {
            //console.log('gametile constructor:' + row + ',' + col);
            this.element = element;
            this.initialize(row, col, size);
        }
        GameTile.prototype.initialize = function (row, col, size) {
            this.element.style.top = row * size + 'px';
            this.element.style.left = col * size + 'px';
            this.element.style.width = this.element.style.height = size + 'px';
            this.element.className = 'tile';
        };
        GameTile.prototype.Reset = function () {
            this.element.innerText = "";
        };
        GameTile.prototype.Set = function (text) {
            this.element.innerText = text;
        };
        return GameTile;
    })();
    Cm2k15.GameTile = GameTile;
})(Cm2k15 || (Cm2k15 = {}));
var Cm2k15;
(function (Cm2k15) {
    var GamePlayer = (function () {
        function GamePlayer() {
            console.log('player constructor');
            this.x = 2;
            this.y = 2;
        }
        GamePlayer.prototype.GetPosition = function () {
            return {
                x: this.x,
                y: this.y
            };
        };
        GamePlayer.prototype.Move = function (direction) {
            switch (direction) {
                case 'up':
                    this.y--;
                    break;
                case 'down':
                    this.y++;
                    break;
                case 'left':
                    this.x--;
                    break;
                case 'right':
                    this.x++;
                    break;
                default:
                    return 'Move where?';
            }
            return "You have moved " + direction + ".";
        };
        return GamePlayer;
    })();
    Cm2k15.GamePlayer = GamePlayer;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="GameTile.ts"/>
/// <reference path="GamePlayer.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var GameMap = (function () {
        function GameMap(map, player) {
            this.tileCount = 8;
            console.log('gamemap constructor');
            var mapWidth = map.clientWidth;
            var tileSize = mapWidth / this.tileCount;
            this.player = player;
            this.tiles = [];
            for (var i = 0; i < this.tileCount; i++) {
                this.tiles.push([]);
                for (var j = 0; j < this.tileCount; j++) {
                    var element = document.createElement('div');
                    this.tiles[i][j] = new Cm2k15.GameTile(i, j, tileSize, element);
                    map.appendChild(element);
                }
            }
        }
        GameMap.prototype.Display = function () {
            var playerpos = this.player.GetPosition();
            for (var i = 0; i < this.tileCount; i++) {
                for (var j = 0; j < this.tileCount; j++) {
                    if (i == playerpos.y && j == playerpos.x) {
                        this.tiles[i][j].Set('[x]');
                    }
                    else {
                        this.tiles[i][j].Reset();
                    }
                }
            }
        };
        return GameMap;
    })();
    Cm2k15.GameMap = GameMap;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="GameMap.ts"/>
/// <reference path="GamePlayer.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var Game = (function () {
        function Game(map, input, message) {
            var _this = this;
            console.log('game constructor');
            this.commands = {};
            this.player = new Cm2k15.GamePlayer();
            this.map = new Cm2k15.GameMap(map, this.player);
            this.map.Display();
            this.messageElement = message;
            input.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    var command = input.value;
                    input.value = '';
                    _this.onCommand.call(_this, command);
                    return false;
                }
            };
            this.registerCommands();
        }
        Game.prototype.registerCommands = function () {
            this.registerCommand('move', this.moveCommand);
        };
        Game.prototype.registerCommand = function (key, command) {
            this.commands[key] = command.bind(this);
        };
        Game.prototype.onCommand = function (text) {
            var parts = text.split(" ");
            var command = parts[0];
            var args = parts.length > 1 ? parts.splice(1, parts.length - 1) : [];
            if (this.commands[command]) {
                var result = this.commands[command].apply(this, args);
                this.message(result);
            }
            else {
                this.messageNoCommand();
            }
        };
        Game.prototype.moveCommand = function (direction) {
            var result = this.player.Move(direction);
            this.map.Display();
            return result;
        };
        Game.prototype.message = function (text) {
            if (text) {
                var row = document.createElement('div');
                row.innerText = text;
                this.messageElement.appendChild(row);
                this.messageElement.scrollTop = this.messageElement.scrollHeight - this.messageElement.clientHeight;
            }
        };
        Game.prototype.messageNoCommand = function () {
            var messages = [
                "what?",
                "uhm...",
                "nope",
                "i dont think so"
            ];
            var message = messages[Math.floor(Math.random() * messages.length)];
            this.message(message);
        };
        return Game;
    })();
    Cm2k15.Game = Game;
})(Cm2k15 || (Cm2k15 = {}));
/// <reference path="Game.ts"/>
var Cm2k15;
(function (Cm2k15) {
    var commandInput = document.getElementById('command');
    var map = document.getElementById('map');
    var message = document.getElementById('message');
    var game = new Cm2k15.Game(map, commandInput, message);
})(Cm2k15 || (Cm2k15 = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVUaWxlLnRzIiwiR2FtZVBsYXllci50cyIsIkdhbWVNYXAudHMiLCJHYW1lLnRzIiwiYXBwLnRzIl0sIm5hbWVzIjpbIkNtMmsxNSIsIkNtMmsxNS5HYW1lVGlsZSIsIkNtMmsxNS5HYW1lVGlsZS5jb25zdHJ1Y3RvciIsIkNtMmsxNS5HYW1lVGlsZS5pbml0aWFsaXplIiwiQ20yazE1LkdhbWVUaWxlLlJlc2V0IiwiQ20yazE1LkdhbWVUaWxlLlNldCIsIkNtMmsxNS5HYW1lUGxheWVyIiwiQ20yazE1LkdhbWVQbGF5ZXIuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZVBsYXllci5HZXRQb3NpdGlvbiIsIkNtMmsxNS5HYW1lUGxheWVyLk1vdmUiLCJDbTJrMTUuR2FtZU1hcCIsIkNtMmsxNS5HYW1lTWFwLmNvbnN0cnVjdG9yIiwiQ20yazE1LkdhbWVNYXAuRGlzcGxheSIsIkNtMmsxNS5HYW1lIiwiQ20yazE1LkdhbWUuY29uc3RydWN0b3IiLCJDbTJrMTUuR2FtZS5yZWdpc3RlckNvbW1hbmRzIiwiQ20yazE1LkdhbWUucmVnaXN0ZXJDb21tYW5kIiwiQ20yazE1LkdhbWUub25Db21tYW5kIiwiQ20yazE1LkdhbWUubW92ZUNvbW1hbmQiLCJDbTJrMTUuR2FtZS5tZXNzYWdlIiwiQ20yazE1LkdhbWUubWVzc2FnZU5vQ29tbWFuZCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxNQUFNLENBeUJaO0FBekJELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDYkE7UUFHRUMsa0JBQW1CQSxHQUFXQSxFQUFFQSxHQUFXQSxFQUFFQSxJQUFZQSxFQUFFQSxPQUF1QkE7WUFDaEZDLHlEQUF5REE7WUFDekRBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFDQSxHQUFHQSxFQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7UUFFT0QsNkJBQVVBLEdBQWxCQSxV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SUFDYkEsSUFBSUEsWUFBWUEsR0FBd0JBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO0lBQzNFQSxJQUFJQSxHQUFHQSxHQUFtQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDekRBLElBQUlBLE9BQU9BLEdBQW1CQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNqRUEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsWUFBWUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDekRBLENBQUNBLEVBTE0sTUFBTSxLQUFOLE1BQU0sUUFLWiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgY2xhc3MgR2FtZVRpbGUge1xyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIsIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ2dhbWV0aWxlIGNvbnN0cnVjdG9yOicgKyByb3cgKyAnLCcgKyBjb2wpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICB0aGlzLmluaXRpYWxpemUocm93LGNvbCxzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemUocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpe1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gcm93KnNpemUgKyAncHgnO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGNvbCpzaXplICsgJ3B4JztcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHNpemUgKyAncHgnO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gJ3RpbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldCgpe1xyXG4gICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0KHRleHQ6IHN0cmluZyl7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfVxyXG4gIH1cclxufSIsIm1vZHVsZSBDbTJrMTUge1xyXG4gIGV4cG9ydCBjbGFzcyBHYW1lUGxheWVyIHtcclxuICAgIHByaXZhdGUgeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB5OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncGxheWVyIGNvbnN0cnVjdG9yJyk7XHJcbiAgICAgIHRoaXMueCA9IDI7XHJcbiAgICAgIHRoaXMueSA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFBvc2l0aW9uKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICB5OiB0aGlzLnlcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTW92ZShkaXJlY3Rpb246IHN0cmluZykge1xyXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgIHRoaXMueS0tO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICB0aGlzLnkrKztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgdGhpcy54LS07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICB0aGlzLngrKztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gJ01vdmUgd2hlcmU/JztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFwiWW91IGhhdmUgbW92ZWQgXCIgKyBkaXJlY3Rpb24gKyBcIi5cIjtcclxuICAgIH1cclxuICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiR2FtZVRpbGUudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJHYW1lUGxheWVyLnRzXCIvPlxyXG5tb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgY2xhc3MgR2FtZU1hcCB7XHJcbiAgICB0aWxlQ291bnQgPSA4O1xyXG4gICAgdGlsZXM6IEdhbWVUaWxlW11bXTtcclxuICAgIHBsYXllcjogR2FtZVBsYXllcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWFwOiBIVE1MRGl2RWxlbWVudCwgcGxheWVyOiBHYW1lUGxheWVyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdnYW1lbWFwIGNvbnN0cnVjdG9yJyk7XHJcblxyXG4gICAgICB2YXIgbWFwV2lkdGggPSBtYXAuY2xpZW50V2lkdGg7XHJcbiAgICAgIHZhciB0aWxlU2l6ZSA9IG1hcFdpZHRoIC8gdGhpcy50aWxlQ291bnQ7XHJcblxyXG4gICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgdGhpcy50aWxlcyA9IFtdO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGlsZUNvdW50OyBpKyspIHsgIFxyXG4gICAgICAgIHRoaXMudGlsZXMucHVzaChbXSk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIHRoaXMudGlsZXNbaV1bal0gPSBuZXcgR2FtZVRpbGUoaSwgaiwgdGlsZVNpemUsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgbWFwLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBEaXNwbGF5KCkge1xyXG4gICAgICB2YXIgcGxheWVycG9zID0gdGhpcy5wbGF5ZXIuR2V0UG9zaXRpb24oKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoaSA9PSBwbGF5ZXJwb3MueSAmJiBqID09IHBsYXllcnBvcy54KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXNbaV1bal0uU2V0KCdbeF0nKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXNbaV1bal0uUmVzZXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiR2FtZU1hcC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWVQbGF5ZXIudHNcIi8+XHJcblxyXG5tb2R1bGUgQ20yazE1IHtcclxuICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBwcml2YXRlIG1hcDogR2FtZU1hcDtcclxuICAgIHByaXZhdGUgcGxheWVyOiBHYW1lUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtZXNzYWdlRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGNvbW1hbmRzOiB7IFtrZXk6IHN0cmluZ106IChhcmdzKSA9PiBhbnkgfTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWFwOiBIVE1MRGl2RWxlbWVudCwgaW5wdXQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG1lc3NhZ2U6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdnYW1lIGNvbnN0cnVjdG9yJyk7XHJcblxyXG4gICAgICB0aGlzLmNvbW1hbmRzID0ge307XHJcbiAgICAgIHRoaXMucGxheWVyID0gbmV3IEdhbWVQbGF5ZXIoKTtcclxuICAgICAgdGhpcy5tYXAgPSBuZXcgR2FtZU1hcChtYXAsIHRoaXMucGxheWVyKTtcclxuICAgICAgdGhpcy5tYXAuRGlzcGxheSgpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gbWVzc2FnZTtcclxuXHJcbiAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG4gICAgICAgICAgdmFyIGNvbW1hbmQgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICB0aGlzLm9uQ29tbWFuZC5jYWxsKHRoaXMsIGNvbW1hbmQpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJDb21tYW5kcygpIHtcclxuICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoJ21vdmUnLCB0aGlzLm1vdmVDb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyQ29tbWFuZChrZXk6IHN0cmluZywgY29tbWFuZDogKGFyZ3MpID0+IGFueSkge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzW2tleV0gPSBjb21tYW5kLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbW1hbmQodGV4dCkge1xyXG4gICAgICB2YXIgcGFydHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcclxuICAgICAgdmFyIGNvbW1hbmQgPSBwYXJ0c1swXTtcclxuICAgICAgdmFyIGFyZ3MgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHMuc3BsaWNlKDEsIHBhcnRzLmxlbmd0aCAtIDEpIDogW107XHJcbiAgICAgIGlmICh0aGlzLmNvbW1hbmRzW2NvbW1hbmRdKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY29tbWFuZHNbY29tbWFuZF0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlKHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlTm9Db21tYW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdmVDb21tYW5kKGRpcmVjdGlvbikge1xyXG4gICAgICB2YXIgcmVzdWx0ID0gdGhpcy5wbGF5ZXIuTW92ZShkaXJlY3Rpb24pO1xyXG4gICAgICB0aGlzLm1hcC5EaXNwbGF5KCk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcm93LmlubmVyVGV4dCA9IHRleHQ7XHJcblxyXG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMubWVzc2FnZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5tZXNzYWdlRWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VOb0NvbW1hbmQoKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlcyA9IFtcclxuICAgICAgICBcIndoYXQ/XCIsXHJcbiAgICAgICAgXCJ1aG0uLi5cIixcclxuICAgICAgICBcIm5vcGVcIixcclxuICAgICAgICBcImkgZG9udCB0aGluayBzb1wiXHJcbiAgICAgIF07XHJcblxyXG4gICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1lc3NhZ2VzLmxlbmd0aCldO1xyXG4gICAgICB0aGlzLm1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkdhbWUudHNcIi8+XHJcbm1vZHVsZSBDbTJrMTUge1xyXG4gIHZhciBjb21tYW5kSW5wdXQgPSA8SFRNTFRleHRBcmVhRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWFuZCcpO1xyXG4gIHZhciBtYXAgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG4gIHZhciBtZXNzYWdlID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XHJcbiAgdmFyIGdhbWUgPSBuZXcgQ20yazE1LkdhbWUobWFwLCBjb21tYW5kSW5wdXQsIG1lc3NhZ2UpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
