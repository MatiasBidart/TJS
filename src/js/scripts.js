import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// npx parcel src/index.html

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(26, 16, 6);
orbit.update();

const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

const gltfLoader = new GLTFLoader();

// const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 4;

// Agregar iluminación
const ambientLight = new THREE.AmbientLight(0x404040, 14); // Intensidad reducida
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4); // Intensidad reducida
directionalLight.position.set(30, 20, 10);
scene.add(directionalLight);

let myModel;

// rgbeLoader.load('./assets/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = texture;

    gltfLoader.load('./assets/scene.gltf', function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        myModel = model;
    });
// });

function animate(time) {
 /*   if(myModel)
        myModel.rotation.y = - time / 2000;*/
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});