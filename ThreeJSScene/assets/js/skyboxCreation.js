import * as THREE from 'three';

/**
 * 
 * @param {String} filename - Nom des differentes images qui composent la skybox  
 * @return {String[]} - Une liste de tous les noms des images
 */
function createPathStrings(filename) {
    const basePath = "./public/";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    const pathStings = sides.map(side => {
        return baseFilename + "-" + side + fileType;
    });

    return pathStings;
}
/**
 * 
 * @param {*} filename - Nom des differentes images qui composent la skybox  
 * @returns - Une liste de toutes les textures de la skybox
 */
export function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);
    var materialArray = [];
    for (let i = 0; i < 6; i++) {
        let currentTexture = new THREE.TextureLoader().load(skyboxImagepaths[i]);
        currentTexture.side = THREE.BackSide;
        materialArray.push(new THREE.MeshBasicMaterial({ map: currentTexture }));
    }
    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    return materialArray;
}