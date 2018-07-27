"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderManager_1 = require("./ShaderManager");
var TextureManager_1 = require("./TextureManager");
var MaterialManager_1 = require("./MaterialManager");
var SubstanceTemplate_1 = require("./SubstanceTemplate");
var ModelManager_1 = require("./ModelManager");
var float32vector_1 = require("./float32vector");
var CameraManager_1 = require("./CameraManager");
var MouseDrag_1 = require("./MouseDrag");
var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');
//この時点でglの型が未確定なので、型チェックが必要
if (gl !== null && gl instanceof WebGLRenderingContext) {
    ShaderManager_1.ShaderManager.instance.setContext(gl);
    var loadShaderPromise = ShaderManager_1.ShaderManager.instance.loadShaders();
    TextureManager_1.TextureManager.instance.setContext(gl);
    var loadTexturePromise = TextureManager_1.TextureManager.instance.loadTextures();
    var loadModelPromise = ModelManager_1.ModelManager.instance.loadModels();
    Promise.all([loadShaderPromise, loadTexturePromise, loadModelPromise])
        .then(function () {
        MaterialManager_1.MaterialManager.instance.init();
        var mainCamera = CameraManager_1.CameraManager.instance.create('MainCamera');
        mainCamera.activate();
        mainCamera.transform.position = new float32vector_1.Vector3(0, 0, -5);
        var template = new SubstanceTemplate_1.SubstanceTemplate(gl, 'smoothsphere', 'standard/tiles');
        var substance = template.instantiate();
        if (substance !== null) {
            substance.transform.rotate = new float32vector_1.Vector3(0, 0, 45);
            substance.transform.scale = new float32vector_1.Vector3(2, 2, 2);
        }
        var skyboxTemplate = new SubstanceTemplate_1.SubstanceTemplate(gl, 'skybox', 'skybox');
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
        if (substance !== null) {
            setInterval(function () {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                // substance.transform.addRotation(2, 0, 0);
                substance.update();
                skyboxTemplate.render();
                template.render();
                gl.flush();
            }, 33);
        }
    });
}
else {
    console.error('webgl not found');
}
