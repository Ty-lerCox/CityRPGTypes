"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.WorldLocation = exports.PlayerObject = void 0;
var PlayerObject = (function () {
    function PlayerObject(name, id, controller, state) {
        this.name = name;
        this.id = id;
        this.controller = controller;
        this.state = state;
    }
    return PlayerObject;
}());
exports.PlayerObject = PlayerObject;
var WorldLocation = (function () {
    function WorldLocation() {
    }
    WorldLocation.mapWorldLocation = function (xyz) {
        return {
            x: xyz[0],
            y: xyz[1],
            z: xyz[2],
        };
    };
    return WorldLocation;
}());
exports.WorldLocation = WorldLocation;
var Location;
(function (Location) {
    Location[Location["Outside"] = 0] = "Outside";
    Location[Location["Bank"] = 1] = "Bank";
    Location[Location["Robbery"] = 2] = "Robbery";
    Location[Location["TownHall"] = 3] = "TownHall";
    Location[Location["Dealer"] = 4] = "Dealer";
    Location[Location["Police"] = 5] = "Police";
    Location[Location["Restaurant"] = 6] = "Restaurant";
})(Location = exports.Location || (exports.Location = {}));
