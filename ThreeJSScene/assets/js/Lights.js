import * as THREE from "three";

export function InitLights(scene) {

    const pointLight1 = new THREE.PointLight(0xffffff, 0.2, 1500);
    pointLight1.position.set(0, 100, 0);
    scene.add(pointLight1);

    const spotLight1 = new THREE.SpotLight(0xaaaaff, 5, 500, 5 * (Math.PI / 180));
    spotLight1.position.set(-50, 50, 100);
    const targetObject1 = new THREE.Object3D();
    targetObject1.position.set(100, 0, -100);
    scene.add(targetObject1);
    spotLight1.target = targetObject1;
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0xffaaff, 5, 500, 5 * (Math.PI / 180));
    spotLight2.position.set(50, 50, 100);
    const targetObject2 = new THREE.Object3D();
    targetObject2.position.set(-100, 0, -100);
    scene.add(targetObject2);
    spotLight2.target = targetObject2;
    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(0xffffaa, 5, 500, 5 * (Math.PI / 180));
    spotLight3.position.set(-50, 50, -100);
    const targetObject3 = new THREE.Object3D();
    targetObject3.position.set(100, 0, 100);
    scene.add(targetObject3);
    spotLight3.target = targetObject3;
    scene.add(spotLight3);

    const spotLight4 = new THREE.SpotLight(0xffaaaa, 5, 500, 5 * (Math.PI / 180));
    spotLight4.position.set(50, 50, -100);
    const targetObject4 = new THREE.Object3D();
    targetObject4.position.set(-100, 0, 100);
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
}