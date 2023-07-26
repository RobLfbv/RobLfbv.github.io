import * as THREE from "three";

/**
 *
 * @param {String} filename - Nom des differentes images qui composent la skybox
 * @return {String[]} - Une liste de tous les noms des images
 */
function createPathStrings(filename) {
  const basePath = "./public/";
  const baseFilename = basePath + filename;
  const fileType = ".png";
  //const side = ["xpos", "xneg", "ypos", "yneg", "zneg", "zpos"];
  //const side = ["1", "2", "5", "6", "3", "4"];
  const side = ["1", "3", "5", "6", "2", "4"];
  /*const pathStings = side.map(side => {
    return baseFilename + "-" + side + fileType;
  });*/
  const pathStings = side.map((side) => {
    return basePath + side + fileType;
  });

  return pathStings;
}
/**
 *
 * @param {*} filename - Nom des differentes images qui composent la skybox
 * @returns - Une liste de toutes les textures de la skybox
 */
function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  /*const skyboxImagepaths = [];
  for (let i = 0; i < 6; i++) {
    skyboxImagepaths[i] = "./public/" + filename + ".jpg";
  }*/
  console.log(skyboxImagepaths);
  var materialArray = [];
  for (let i = 0; i < 6; i++) {
    let currentTexture = new THREE.TextureLoader().load(skyboxImagepaths[i]);
    currentTexture.side = THREE.BackSide;
    materialArray.push(
      new THREE.MeshBasicMaterial({
        map: currentTexture,
        reflectivity: 0,
        color: 0x909090,
      })
    );
  }
  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

  return materialArray;
}

export function CreateSkyBox(scene, filename) {
  const materialSkybox = createMaterialArray(filename);
  const skyBoxGeometry = new THREE.BoxGeometry(10001, 10001, 10001);
  const skyBox = new THREE.Mesh(skyBoxGeometry, materialSkybox);
  scene.add(skyBox);

}
