"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OreOreWebGL_1 = require("./OreOreWebGL");
var SubstanceTemplate_1 = require("./SubstanceTemplate");
var float32vector_1 = require("./float32vector");
var CameraManager_1 = require("./CameraManager");
var MouseDrag_1 = require("./MouseDrag");
var cameraManagerInstance = CameraManager_1.CameraManager.instance;
var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
var loadShaderData = fetch('./data/shader.json');
var loadTextureData = fetch('./data/textures.json');
var loadModelData = fetch('./data/models.json');
var loadMaterialData = fetch('./data/materials.json');
Promise.all([loadShaderData, loadTextureData, loadModelData, loadMaterialData])
    .then(function (response) { return Promise.all([response[0].text(), response[1].text(), response[2].text(), response[3].text()]); })
    .then(function (data) {
    var oreore = new OreOreWebGL_1.OreOreWebGL(canvas, JSON.parse(data[0]), JSON.parse(data[1]), JSON.parse(data[2]), JSON.parse(data[3]), function () {
        var mainCamera = CameraManager_1.CameraManager.instance.create('MainCamera');
        mainCamera.activate();
        mainCamera.transform.position = new float32vector_1.Vector3(0, 0, -5);
        var template = new SubstanceTemplate_1.SubstanceTemplate(oreore.gl, 'smoothsphere', 'standard/tiles');
        oreore.addTemplate(template);
        var substance = template.instantiate();
        if (substance !== null) {
            substance.transform.rotate = new float32vector_1.Vector3(0, 0, 45);
            substance.transform.scale = new float32vector_1.Vector3(2, 2, 2);
        }
        var skyboxTemplate = new SubstanceTemplate_1.SubstanceTemplate(oreore.gl, 'skybox', 'skybox');
        oreore.addTemplate(skyboxTemplate);
        skyboxTemplate.instantiate();
        var leftMouseDrag = new MouseDrag_1.MouseDrag(canvas, MouseDrag_1.MouseButton.LEFT);
        leftMouseDrag.onDrag = function (x, y) {
            var magnification = 0.5;
            mainCamera.transform.addRotation(-y * magnification, -x * magnification, 0);
        };
        var middleMouseDrag = new MouseDrag_1.MouseDrag(canvas, MouseDrag_1.MouseButton.MIDDLE);
        middleMouseDrag.onDrag = function (x, y) {
            var magnification = 0.1;
            mainCamera.transform.addPosition(x * magnification, -y * magnification, 0);
        };
        oreore.play();
    });
});
var updateAspectRatio = function () {
    cameraManagerInstance.aspect = window.innerWidth / window.innerHeight;
};
window.addEventListener('load', updateAspectRatio);
window.addEventListener('resize', updateAspectRatio);
