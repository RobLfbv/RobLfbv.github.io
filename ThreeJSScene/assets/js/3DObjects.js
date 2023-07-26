import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function Create3DObjects(scene, floorName) {
    CreateGround(scene, floorName);
    LoadAndCreateModel(scene);
    CreateBush(scene);
}


function CreateGround(scene, floorName) {
    const floorTexture = new THREE.TextureLoader().load(floorName);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    var floorMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
    });
    floorMaterial.shininess = 0;
    const materialCircle = new THREE.MeshPhongMaterial({ color: 0x517832 });
    const floorGeometry = new THREE.PlaneGeometry(10000, 10000, 10, 10);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y -= 0;
    floor.rotateX(90 * (Math.PI / 180));
    scene.add(floor);

}

function LoadAndCreateModel(scene) {
    const loader = new GLTFLoader();
    loader.load(
        "./public/stade.gltf",
        function (gltf) {
            gltf.scene.position.set(0, 0, 0);
            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
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
}

function CreateBush(scene) {
    const bushMaterial = new THREE.MeshPhongMaterial({ color: 0x517832 });
    for (let i = 0; i < 50; i++) {
        const geometryCircle = new THREE.SphereGeometry(5);
        const circle = new THREE.Mesh(geometryCircle, bushMaterial);
        circle.position.set(getRandomInt(-1000, 1000), 5, getRandomInt(-1000, 1000));
        scene.add(circle);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}