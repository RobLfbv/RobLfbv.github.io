import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createMaterialArray } from "./skyboxCreation.js";

/**
 * Variables de la scene
 */
//Nom des differentes images pour la skybox dans les fichiers
let skyboxImage = "nebula";
//Nom des deux images pour la texture du cube
let textureCubeTopBot = "./public/OakLog-topbot.png";
let textureCubeSide = "./public/OakLog-side.png";
//Vitesse de rotation des cubes
let rotationSpeedCube1 = 0.05;
let rotationSpeedCube2 = 0.01;
//Vitesse de rotation de la camera
let speedMovementInCircle = 0.01;
let speedMovementOutward = 0.5;
let speedMovementInward = 3;
//Position Y max de la camera
let yPosMaxCamera = 400;


/**
 * Initialisation de la scene, de la camera et de sa position et ajout de la scene à la page html
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
function render() {
    renderer.render(scene, camera);
}
controls.minDistance = 0;
controls.maxDistance = 1000;
document.body.appendChild(renderer.domElement);
camera.position.set(50, 200, 140);
camera.rotation.set(-0.6, 0.3, 0.2);

/**
 * Creation des textures et des materials des differents objets 3D
 */
const floorTexture = new THREE.TextureLoader().load('./public/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(5, 5);
var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.DoubleSide });

const textureSideCube = new THREE.TextureLoader().load(textureCubeSide);
const textureTopCube = new THREE.TextureLoader().load(textureCubeTopBot);
const materialCube = [
    new THREE.MeshPhongMaterial({ map: textureSideCube }),
    new THREE.MeshPhongMaterial({ map: textureSideCube }),
    new THREE.MeshPhongMaterial({ map: textureTopCube }),
    new THREE.MeshPhongMaterial({ map: textureTopCube }),
    new THREE.MeshPhongMaterial({ map: textureSideCube }),
    new THREE.MeshPhongMaterial({ map: textureSideCube })];
const materialCube2 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const materialSkybox = createMaterialArray(skyboxImage);


/**
 * Creation de la lumiere
 */
const light = new THREE.AmbientLight(0x404040, 0.5); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);

scene.add(directionalLight);
scene.add(light);

/**
 * Creation des différents objets 3D
 */
//Cube au centre
const geometryCube = new THREE.BoxGeometry(100, 100, 100);
const cube1 = new THREE.Mesh(geometryCube, materialCube);
const cube2 = new THREE.Mesh(geometryCube, materialCube2);
cube1.position.y += 100;

//Sol en damier
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y -= 55;
floor.rotateX(90 * (Math.PI / 180));

//Skybox
const skyBoxGeometry = new THREE.BoxGeometry(1001, 1001, 1001);
const skyBox = new THREE.Mesh(skyBoxGeometry, materialSkybox);

/**
 * Ajout a la scene de tous les objets 3D
 */
scene.add(skyBox);
scene.add(floor);
scene.add(cube1);
scene.add(cube2);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        controls.enabled = false;
        cameraMovement = false;
    }
};
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 32) {
        controls.enabled = false;
        cameraMovement = false;
    }
};

addEventListener("mouseup", (event) => {
    console.log('Click just happened')
    cameraMovement = true;
});

addEventListener("mousedown", (event) => {
    console.log('Click is happening');
    cameraMovement = false;
});

var t = 0;
var coef = 100;
var cameraMovement = true;
controls.target = new THREE.Vector3(0,0,0);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
function animate() {
    requestAnimationFrame(animate);

    cube1.rotation.y += rotationSpeedCube1;
    cube2.rotation.y += rotationSpeedCube2;
    /*if (cameraMovement) {
        camera.position.x = 300 * Math.cos(t) + 0;
        camera.position.z = 300 * Math.sin(t) + 0;
        camera.lookAt(cube1.position);
        t += speedMovementInCircle;
    }*/
    controls.update();
    renderer.render(scene, camera);
}
animate();