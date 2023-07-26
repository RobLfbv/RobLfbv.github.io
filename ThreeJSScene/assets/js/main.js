import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createMaterialArray } from "./skyboxCreation.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
/**
 * Variables de la scene
 */
//Nom des differentes images pour la skybox dans les fichiers
let skyboxImage = "galaxy";
//Nom des deux images pour la texture du cube
let textureCubeTopBot = "./public/OakLog-topbot.png";
let textureCubeSide = "./public/OakLog-side.png";
let textureGrass = "./public/Grass.jpg";
//Vitesse de rotation de la camera
let speedMovementInCircle = 0.001;

/**
 * Initialisation de la scene, de la camera et de sa position et ajout de la scene à la page html
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
//const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
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
//scene.fog = new THREE.Fog(0xcccccc, 600, 700);

/**
 * Creation des textures et des materials des differents objets 3D
 */
//const floorTexture = new THREE.TextureLoader().load('./public/checkerboard.jpg');
const floorTexture = new THREE.TextureLoader().load(textureGrass);
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);
var floorMaterial = new THREE.MeshPhongMaterial({
  map: floorTexture,
  side: THREE.DoubleSide,
});
floorMaterial.shininess = 0;
const textureSideCube = new THREE.TextureLoader().load(textureCubeSide);
const textureTopCube = new THREE.TextureLoader().load(textureCubeTopBot);
const materialCube = [
  new THREE.MeshPhongMaterial({ map: textureSideCube }),
  new THREE.MeshPhongMaterial({ map: textureSideCube }),
  new THREE.MeshPhongMaterial({ map: textureTopCube }),
  new THREE.MeshPhongMaterial({ map: textureTopCube }),
  new THREE.MeshPhongMaterial({ map: textureSideCube }),
  new THREE.MeshPhongMaterial({ map: textureSideCube }),
];
const materialCube2 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const materialCircle = new THREE.MeshPhongMaterial({ color: 0x517832 });
const materialSkybox = createMaterialArray(skyboxImage);

/**
 * Creation de la lumiere
 */
//const light = new THREE.AmbientLight(0x404040, 0); // soft white light
const directionalLight = new THREE.DirectionalLight(0x404040, 0);
directionalLight.position.set(1, 2, 0);

const pointLight1 = new THREE.PointLight(0xffffff, 0.2, 1500);
pointLight1.position.set(0, 100, 0);
scene.add(pointLight1);

const spotLight1 = new THREE.SpotLight(0xaaaaff, 5, 500, 5 * (Math.PI / 180));
spotLight1.position.set(-50, 50, 100);
const targetObject1 = new THREE.Object3D();
targetObject1.position.set(100, 0, -100);
scene.add(targetObject1);
spotLight1.target = targetObject1;

const spotLight2 = new THREE.SpotLight(0xffaaff, 5, 500, 5 * (Math.PI / 180));
spotLight2.position.set(50, 50, 100);
const targetObject2 = new THREE.Object3D();
targetObject2.position.set(-100, 0, -100);
scene.add(targetObject2);
spotLight2.target = targetObject2;

const spotLight3 = new THREE.SpotLight(0xffffaa, 5, 500, 5 * (Math.PI / 180));
spotLight3.position.set(-50, 50, -100);
const targetObject3 = new THREE.Object3D();
targetObject3.position.set(100, 0, 100);
scene.add(targetObject3);
spotLight3.target = targetObject3;

const spotLight4 = new THREE.SpotLight(0xffaaaa, 5, 500, 5 * (Math.PI / 180));
spotLight4.position.set(50, 50, -100);
const targetObject4 = new THREE.Object3D();
targetObject4.position.set(-100, 0, 100);
scene.add(targetObject4);
spotLight4.target = targetObject4;

const spotLight5 = new THREE.SpotLight(0xffffff, 1, 800, 20 * (Math.PI / 180));
spotLight5.position.set(0, 500, 0);
const targetObject5 = new THREE.Object3D();
targetObject5.position.set(0, 0, 0);
scene.add(targetObject5);
spotLight5.target = targetObject5;

scene.add(spotLight1);
scene.add(spotLight2);
scene.add(spotLight3);
scene.add(spotLight4);
scene.add(spotLight5);

scene.add(directionalLight);

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
var json = floor.toJSON();
console.log(json);
//downloadObjectAsJson(json, "test");
function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

//Skybox
const skyBoxGeometry = new THREE.BoxGeometry(10001, 10001, 10001);
const skyBox = new THREE.Mesh(skyBoxGeometry, materialSkybox);

const loader = new GLTFLoader();

loader.load(
  "./public/stade.gltf",
  function (gltf) {
    gltf.scene.position.set(0, 0, 0);
    //scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Montains
loader.load(
  "./public/mountains3.gltf",
  function (gltf) {
    gltf.scene.position.set(0, -10, 0);
    gltf.scene.scale.x = 650;
    gltf.scene.scale.y = 200;
    gltf.scene.scale.z = 650;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Creations de buissons
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

for (let i = 0; i < 50; i++) {
  const geometryCircle = new THREE.SphereGeometry(5);
  const circle = new THREE.Mesh(geometryCircle, materialCircle);
  circle.position.set(getRandomInt(-1000, 1000), 5, getRandomInt(-1000, 1000));
  scene.add(circle);
}
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

const fireworks = [];
const clock = new THREE.Clock();

function createFirework(
  scene,
  position,
  color,
  particleCount,
  particleSize,
  explosionRadius,
  explosionDuration,
  fadeOutDuration
) {
  // Variables pour stocker les particules du feu d'artifice
  const particles = new THREE.Group();

  // Création du matériau pour les particules
  const particleMaterial = new THREE.PointsMaterial({
    size: particleSize,
    color: color,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
    map: createParticleTexture(), // Cette fonction crée un sprite de particule
  });

  // Création des particules
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    const vertex = new THREE.Vector3();
    particlePositions.set([vertex.x, vertex.y, vertex.z], i * 3);
    particleVelocities.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      )
    );
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );

  // Création des points pour les particules
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  particles.add(particleSystem);

  // Position du feu d'artifice
  particles.position.copy(position);
  scene.add(particles);

  // Animation du feu d'artifice
  function updateFirework(
    particleSystem,
    particleVelocities,
    explosionDuration,
    fadeOutDuration,
    deltaTime
  ) {
    const particlePositions = particleSystem.geometry.attributes.position;

    for (let i = 0; i < particlePositions.count; i++) {
      const velocity = particleVelocities[i];
      const position = particlePositions.array;
      position[i * 3] += velocity.x * deltaTime;
      position[i * 3 + 1] += velocity.y * deltaTime;
      position[i * 3 + 2] += velocity.z * deltaTime;

      // Appliquer une gravité pour que les particules retombent après l'explosion
      velocity.y -= 9.8 * deltaTime;
    }

    if (particleSystem.userData.explosionTime < explosionDuration) {
      particleSystem.userData.explosionTime += deltaTime;
    } else {
      particleSystem.material.opacity -= deltaTime / fadeOutDuration;
      if (particleSystem.material.opacity <= 0) {
        particleSystem.parent.remove(particleSystem);
      }
    }

    particlePositions.needsUpdate = true;
  }
  // Animation loop
  clock = new THREE.Clock();
  const animate = () => {
    updateFirework();
    if (particles.children.length === 0) {
      // Suppression de l'animation si le feu d'artifice a disparu
      renderer.setAnimationLoop(null);
    }
  };

  renderer.setAnimationLoop(animate);
}

function createParticleTexture() {
  // Créez ici une texture pour les particules (un simple cercle ou étoile blanche sur fond transparent).
  // Vous pouvez utiliser THREE.TextureLoader() pour charger une image externe ou créer une texture
  // directement en dessinant sur un canvas.
}

function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta();
  camera.aspect = window.innerWidth / window.innerHeight;
  if (cameraMovement) {
    camera.position.x = 600 * Math.cos(t) + 0;
    camera.position.z = 600 * Math.sin(t) + 0;
    camera.lookAt(cube1.position);
    t += speedMovementInCircle;
  }

  if (Math.random() < 0.01) {
    // Vous pouvez ajuster le taux d'apparition des feux d'artifice ici
    const fireworkPosition = new THREE.Vector3(
      (Math.random() - 0.5) * 200, // Position aléatoire en X dans une plage de -100 à 100
      Math.random() * 200, // Position aléatoire en Y dans une plage de 0 à 200 (pour qu'il apparaisse au-dessus du sol)
      (Math.random() - 0.5) * 200 // Position aléatoire en Z dans une plage de -100 à 100
    );

    const fireworkColor = new THREE.Color(
      Math.random(), // Valeur aléatoire pour le canal rouge
      Math.random(), // Valeur aléatoire pour le canal vert
      Math.random() // Valeur aléatoire pour le canal bleu
    );

    const particleCount = 1000;
    const particleSize = 2;
    const explosionRadius = 100;
    const explosionDuration = 2;
    const fadeOutDuration = 1;

    createFirework(
      scene,
      fireworkPosition,
      fireworkColor,
      particleCount,
      particleSize,
      explosionRadius,
      explosionDuration,
      fadeOutDuration
    );
    fireworks.push({
      particleSystem,
      particleVelocities: particleSystem.geometry.attributes.position.array.map(
        (_, index) => {
          return new THREE.Vector3(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
          );
        }
      ),
      explosionDuration,
      fadeOutDuration,
    });
  }
  for (const firework of fireworks) {
    updateFirework(
      firework.particleSystem,
      firework.particleVelocities,
      firework.explosionDuration,
      firework.fadeOutDuration,
      deltaTime
    );
  }
  renderer.render(scene, camera);
}
animate();
