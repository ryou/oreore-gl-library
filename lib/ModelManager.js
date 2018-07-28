"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("./Model");
var OBJParser_1 = require("./OBJParser");
var ModelManager = /** @class */ (function () {
    function ModelManager() {
        this._models = [];
    }
    ModelManager.prototype.loadModels = function (modelDefinitions) {
        var _this = this;
        var promises = modelDefinitions.map(function (modelDefinition) {
            return fetch(modelDefinition.path)
                .then(function (response) { return response.text(); })
                .then(function (text) {
                var data = OBJParser_1.OBJParser.parse(text);
                var model = new Model_1.Model(modelDefinition.id, data.verticies, new Uint16Array(data.indicies));
                model.calcTangents();
                model.calcInterleavedValues();
                _this._models.push(model);
            });
        });
        return Promise.all(promises);
    };
    ModelManager.prototype.find = function (id) {
        return this._models.find(function (model) { return model.id === id; });
    };
    ModelManager.instance = new ModelManager();
    return ModelManager;
}());
exports.ModelManager = ModelManager;
