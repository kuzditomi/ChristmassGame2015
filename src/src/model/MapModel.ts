/// <reference path="TileModel.ts"/>
/// <reference path="PlayerModel.ts"/>
/// <reference path="RoomModel.ts"/>

module Cm2k15 {
    export var map = [
        ['-', '-', '-', '-', '-', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
        ['-', '-', '-', '-', '-', 'e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16'],
        ['-', 'm1', 'm2', 'm3', '-', 'e17', 'e17', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24'],
        ['-', 'm4', 'm5', 'm6', '-', '-', '-', '-', 'u5', '-', '-', '-', '-'],
        ['-', 'm7', 'm8', 'u1', 'u1', 'u1', 'u2', 'u1', 'u3', 'u1', 'u1', 'u4', '-'],
        ['-', 'u5', '-', '-', '-', '-', 'u5', '-', '-', '-', '-', 'h1', 'h1'],
        ['-', 'u5', '-', '-', 'g1', 'g2', 'g3', 'g4', 'g5', '-', '-', 'h3', 'h4'],
        ['-', 'u5', '-', '-', 'g6', 'g7', 'g8', 'g9', 'g10', 'k4', 'k1', 'k1', 'k1'],
        ['-', 'u5', '-', '-', 'g11', 'g12', 'g13', 'g14', 'g15', 'k2', '-', '-', '-'],
        ['-', 'i1', 'i2', '-', '-', '-', 'l', '-', 'f1', 'k2', '-', '-', '-'],
        ['-', 'i3', 'i4', 'i5', 'u1', 'u1', 'u6', '-', 'f2', 'k2', '-', '-', '-'],
        ['k1', 'k1', 'k1', 'k1', 'k1', 'k1', 'kb', 'k1', 'k1', 'k3', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    ];

    export var directions = {
        Top: 'up',
        Right: 'right',
        Bottom: 'down',
        Left: 'left'
    };

    export class MapModel {
        public Tiles: TileModel[][];
        public Player: PlayerModel;
        public Rooms: RoomBase[];
        
        public Width: number;
        public Height: number;

        constructor() {
            this.Width = map.length;
            this.Height = map.length;

            this.Tiles = [];

            for (var i = 0; i < this.Height; i++) {
                this.Tiles[i] = [];
                for (var j = 0; j < this.Width; j++) {
                    this.Tiles[i][j] = new TileModel(map[j][i]);
                }
            }

            this.Player = new PlayerModel();
            this.Player.X = 6;
            this.Player.Y = 12;

            this.Tiles[this.Player.X][this.Player.Y].IsVisited = true;

            this.Rooms = [];
        }

        public MovePlayer(direction) {
            var response = this.Player.Move(direction);

            console.log('Player moved ' + this.Player.X + ':' + this.Player.Y);

            return response;
        }
    }
}