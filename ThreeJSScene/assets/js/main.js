import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createMaterialArray } from "./skyboxCreation.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector3 } from 'three';

/**
 * Variables de la scene
 */
//Nom des differentes images pour la skybox dans les fichiers
let skyboxImage = "nebula";
//Nom des deux images pour la texture du cube
let textureCubeTopBot = "./public/OakLog-topbot.png";
let textureCubeSide = "./public/OakLog-side.png";
let textureGrass = "./public/Grass.png";
//Vitesse de rotation de la camera
let speedMovementInCircle = 0.002;



/**
 * Initialisation de la scene, de la camera et de sa position et ajout de la scene à la page html
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
//const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
function render() {
    renderer.render(scene, camera);
}
controls.minDistance = 0;
controls.maxDistance = 800;
document.body.appendChild(renderer.domElement);
camera.position.set(50, 350, 140);
camera.rotation.set(-0.6, 0.3, 0.2);
//scene.fog = new THREE.Fog(0xcccccc, 600, 700);

/**
 * Creation des textures et des materials des differents objets 3D
 */
//const floorTexture = new THREE.TextureLoader().load('./public/checkerboard.jpg');
const floorTexture = new THREE.TextureLoader().load(textureGrass);
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(100, 100);
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
const light = new THREE.AmbientLight(0x404040, 0); // soft white light
const directionalLight = new THREE.DirectionalLight(0x404040, 0);
directionalLight.position.set(1, 2, 0);

const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 500);
pointLight1.position.set(0, 100, 0);
scene.add(pointLight1);

const spotLight1 = new THREE.SpotLight(0xffffff, 0.6, 800, 30 * (Math.PI / 180));
spotLight1.position.set(-50, 50, 100);
const targetObject1 = new THREE.Object3D();
targetObject1.position.set(300, 0, -300);
scene.add(targetObject1);
spotLight1.target = targetObject1;
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff, 0.6, 800, 30 * (Math.PI / 180));
spotLight2.position.set(50, 50, 100);
const targetObject2 = new THREE.Object3D();
targetObject2.position.set(-300, 0, -300);
scene.add(targetObject2);
spotLight2.target = targetObject2;
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 0.6, 800, 30 * (Math.PI / 180));
spotLight3.position.set(-50, 50, -100);
const targetObject3 = new THREE.Object3D();
targetObject3.position.set(300, 0, 300);
scene.add(targetObject3);
spotLight3.target = targetObject3;
scene.add(spotLight3);

const spotLight4 = new THREE.SpotLight(0xffffff, 0.6, 800, 30 * (Math.PI / 180));
spotLight4.position.set(50, 50, -100);
const targetObject4 = new THREE.Object3D();
targetObject4.position.set(-300, 0, 300);
scene.add(targetObject4);
spotLight4.target = targetObject4;
scene.add(spotLight4);

const spotLight5 = new THREE.SpotLight(0xffffff, 1, 800, 20 * (Math.PI / 180));
spotLight5.position.set(0, 500, 0);
const targetObject5 = new THREE.Object3D();
targetObject5.position.set(0, 0, 0);
scene.add(targetObject5);
spotLight5.target = targetObject5;
scene.add(spotLight5);

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
const floorGeometry = new THREE.PlaneGeometry(10000, 10000, 10, 10);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y -= 0;
floor.rotateX(90 * (Math.PI / 180));

//Skybox
const skyBoxGeometry = new THREE.BoxGeometry(10001, 10001, 10001);
const skyBox = new THREE.Mesh(skyBoxGeometry, materialSkybox);

const loader = new GLTFLoader();

loader.load('./public/stade.gltf', function (gltf) {
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});

//Montains
/*
loader.load('./public/mountains.gltf', function (gltf) {
    gltf.scene.position.set(0, -4000, 0);
    gltf.scene.scale.x = 4500;
    gltf.scene.scale.y = 8000;
    gltf.scene.scale.z = 4500;
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./public/mountains.gltf', function (gltf) {
    gltf.scene.position.set(0, -4000, 0);
    gltf.scene.scale.x = 4500;
    gltf.scene.scale.y = 8000;
    gltf.scene.scale.z = 4500;
    gltf.scene.rotation.y = 80 * (Math.PI / 180);
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});
*/
/*
loader.load('./public/mountains2.gltf', function (gltf) {
    gltf.scene.position.set(0, -0, 0);
    gltf.scene.scale.x = 500;
    gltf.scene.scale.y = 150;
    gltf.scene.scale.z = 500;
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});*/
loader.load('./public/mountains3.gltf', function (gltf) {
    gltf.scene.position.set(0, -10, 0);
    gltf.scene.scale.x = 650;
    gltf.scene.scale.y = 200;
    gltf.scene.scale.z = 650;
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});
/**
 * Ajout a la scene de tous les objets 3D
 */
scene.add(skyBox);
scene.add(floor);
//scene.add(cube1);
//scene.add(cube2);


addEventListener("mouseup", (event) => {
    cameraMovement = true;
    camera.position.y = 200;

});

addEventListener("mousedown", (event) => {
    cameraMovement = false;
    camera.position.y = 200;

});

var t = 0;
var cameraMovement = true;
function animate() {
    requestAnimationFrame(animate);
    camera.aspect = window.innerWidth / window.innerHeight;
    if (cameraMovement) {
        camera.position.x = 600 * Math.cos(t) + 0;
        camera.position.z = 600 * Math.sin(t) + 0;
        camera.lookAt(cube1.position);
        t += speedMovementInCircle;
    }
    renderer.render(scene, camera);
}
animate();