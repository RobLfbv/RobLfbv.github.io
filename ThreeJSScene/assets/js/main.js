import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createMaterialArray } from "./skyboxCreation.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
let speedMovementInCircle = 0.01;
//Position Y max de la camera
let yPosMaxCamera = 400;


/**
 * Initialisation de la scene, de la camera et de sa position et ajout de la scene à la page html
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1100);
//const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer = new THREE.WebGLRenderer();
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
camera.position.set(50, 200, 140);
camera.rotation.set(-0.6, 0.3, 0.2);
//scene.fog = new THREE.Fog(0xcccccc, 200, 600);

/**
 * Creation des textures et des materials des differents objets 3D
 */
//const floorTexture = new THREE.TextureLoader().load('./public/checkerboard.jpg');
const floorTexture = new THREE.TextureLoader().load(textureGrass);
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
let textureStade = new THREE.TextureLoader().load('./public/10093_Wembley_stadion_V1_Diffuse.jpg');
const materialStade = new THREE.MeshPhongMaterial({
    map: textureStade
});

/**
 * Creation de la lumiere
 */
const light = new THREE.AmbientLight(0x404040, 0); // soft white light
const directionalLight = new THREE.DirectionalLight(0x404040, 0);
directionalLight.position.set(1, 2, 0);
const pointLight = new THREE.PointLight(0xe8cc97, 1, 500);
pointLight.position.set(0, 100, 0);
scene.add(directionalLight);
scene.add(light);
scene.add(pointLight);

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
floor.position.y -= 0;
floor.rotateX(90 * (Math.PI / 180));

//Skybox
const skyBoxGeometry = new THREE.BoxGeometry(1001, 1001, 1001);
const skyBox = new THREE.Mesh(skyBoxGeometry, materialSkybox);

const loader = new GLTFLoader();

loader.load('./public/stade.gltf', function (gltf) {
    gltf.scene.position.set(0,0,0);
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
    if (cameraMovement) {
        camera.position.x = 400 * Math.cos(t) + 0;
        camera.position.z = 400 * Math.sin(t) + 0;
        camera.lookAt(cube1.position);
        t += speedMovementInCircle;
    }
    renderer.render(scene, camera);
}
animate();