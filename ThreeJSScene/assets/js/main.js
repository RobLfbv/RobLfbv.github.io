import * as THREE from "three";
import * as TWEEN from 'tween';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CreateSkyBox } from "./skyboxCreation.js";
import { InitLights } from "./Lights.js";
import { Create3DObjects } from "./3DObjects.js";
import { sendRandomFireworks } from "./Fireworks.js";

/**
 * Variables de la scene
 */
let pathTextureGrass = "./public/grass.jpg";
let nameSkybox = "";
//Vitesse de rotation de la camera
let speedMovementInCircle = 0.001;
const fireworks = [];

/**
 * Initialisation de la scene, de la camera et de sa position et ajout de la scene à la page html
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100000);
//const camera = new THREE.PerspectiveCamera(60, 300 / 100, 0.1, 100000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: containerCanva });
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setSize(300, 100);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);
function render() {
  renderer.render(scene, camera);
}
controls.minDistance = 0;
controls.maxDistance = 800;
document.body.appendChild(renderer.domElement);
camera.position.set(50, 350, 140);
camera.rotation.set(-0.6, 0.3, 0.2);


addEventListener("mouseup", (event) => {
  cameraMovement = true;
  camera.position.y = 200;
});

addEventListener("mousedown", (event) => {
  cameraMovement = false;
  camera.position.y = 200;
});

CreateSkyBox(scene, nameSkybox);
Create3DObjects(scene, pathTextureGrass);
InitLights(scene);

var t = 0;
var cameraMovement = true;
sendRandomFireworks(scene);
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  camera.aspect = window.innerWidth / window.innerHeight;
  if (cameraMovement) {
    camera.position.x = 600 * Math.cos(t) + 0;
    camera.position.z = 600 * Math.sin(t) + 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    t += speedMovementInCircle;
  }
  renderer.render(scene, camera);
}
animate();
