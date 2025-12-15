//INSTALLATION
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.171/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.171/examples/jsm/loaders/OBJLoader.js";

//CREATING SCENE
const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.set(0, 2, 5);

//RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//LIGHTS
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemilight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

//LOAD OBJ
const loader = new OBJLoader();

loader.load(
    "./models/mars.obj",
    function (object) {
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function (error) {
        console.error("Error Loading OBJ:", error);
    }
);

//RESIZE
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 

//ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();