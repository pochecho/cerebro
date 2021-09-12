"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.IsMutantUsecase = void 0;
var di_1 = require("@decorators/di");
var rxjs_1 = require("rxjs");
var DNA_LENGTH = 4;
var MUTANT_SUBCHAINS_LIMIT = 2;
var POSSIBLE_DIRECTIONS = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1], //Move Down Left
];
var IsMutantUsecase = /** @class */ (function () {
    function IsMutantUsecase() {
    }
    IsMutantUsecase.prototype.call = function (dnaChain) {
        var subChainsResponse = [];
        for (var i = 0; i < dnaChain.length; i++) {
            var row = dnaChain[i];
            for (var j = 0; j < row.length; j++) {
                var indexPosition = [j, i];
                for (var _i = 0, POSSIBLE_DIRECTIONS_1 = POSSIBLE_DIRECTIONS; _i < POSSIBLE_DIRECTIONS_1.length; _i++) {
                    var direction = POSSIBLE_DIRECTIONS_1[_i];
                    this._(dnaChain, indexPosition, [], [], direction, subChainsResponse);
                }
            }
        }
        return (0, rxjs_1.of)({
            isMutant: subChainsResponse.length > 1,
            chains: subChainsResponse
        });
    };
    IsMutantUsecase.prototype._ = function (dnaChain, position, subChainPositions, subChain, direction, subChainsResponse) {
        if (subChainsResponse.length < MUTANT_SUBCHAINS_LIMIT) {
            var currentValue = dnaChain[position[1]][position[0]];
            var belongsToChain = this.belongsToChain(subChain, currentValue);
            if (belongsToChain) {
                var newSubchain = __spreadArray(__spreadArray([], subChain, true), [currentValue], false);
                var newPosition = this.getNewPosition(position, direction);
                var newSubchainPositions = __spreadArray(__spreadArray([], subChainPositions, true), [position], false);
                var isAValidPosition = this.isAValidPosition(dnaChain, newPosition);
                if (isAValidPosition) {
                    var isSubChainComplete = newSubchain.length === DNA_LENGTH;
                    if (!isSubChainComplete) {
                        this._(dnaChain, newPosition, newSubchainPositions, newSubchain, direction, subChainsResponse);
                    }
                    else {
                        var subchainResponse = {
                            positions: newSubchainPositions,
                            chain: newSubchain
                        };
                        if (!this.isSubchainPresent(subChainsResponse, subchainResponse)) {
                            subChainsResponse.push(subchainResponse);
                        }
                    }
                }
            }
        }
    };
    IsMutantUsecase.prototype.isAValidPosition = function (dnaChain, position) {
        var x = position[0];
        var y = position[1];
        return x >= 0 && y >= 0 && y < dnaChain.length && x < dnaChain[y].length;
    };
    IsMutantUsecase.prototype.getNewPosition = function (position, direction) {
        return [position[0] + direction[0], position[1] + direction[1]];
    };
    IsMutantUsecase.prototype.belongsToChain = function (subChain, base) {
        return subChain.includes(base) || subChain.length === 0;
    };
    IsMutantUsecase.prototype.isSubchainPresent = function (subChainsResponse, subChainResponse) {
        for (var _i = 0, subChainsResponse_1 = subChainsResponse; _i < subChainsResponse_1.length; _i++) {
            var item = subChainsResponse_1[_i];
            return String(item.positions) == String(subChainResponse.positions);
        }
        return false;
    };
    IsMutantUsecase = __decorate([
        (0, di_1.Injectable)()
    ], IsMutantUsecase);
    return IsMutantUsecase;
}());
exports.IsMutantUsecase = IsMutantUsecase;
