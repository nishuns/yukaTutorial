import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as YUKA from 'yuka';
import * as dat from 'dat.gui';
import addGltfToPath from './addGltfToPath';
import addModel from './addModel';
import getCoordinatesWithObstacle from './getCoordinateFromObstacle';
import sync from './syncModelToPath';

//------------------------------------- RENDERED INIT -------------------------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xA3A3A3);

//---------------------------------- CREATED SCENE -----------------------------------------------------------------------------------

const scene = new THREE.Scene();

//---------------------------------- CAMERA AND ORBIT CONTROLS -----------------------------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(50, 30, 100);
camera.lookAt(scene.position);

// Orbit Controls
/**
 * Orbit controls get us to scroll over the graph 
 * it is imported with -> import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 
 * */
const controls = new OrbitControls(camera, renderer.domElement);

//---------------------------------- OBSTACLES AND CHEKPOINTs -----------------------------------------------------------------------

// GLTF Loader
/**
 * it is imported with -> import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 * used to import GLTF
 * takes asset path and inorder to create asset path you need to create a 
 * const newURL = new URL(path, import.meta.url)
 */
const loader = new GLTFLoader();

/**
 * Added Obstacles with AddGltfToPath function it should provide an call in the end to use it at different end
 */
addModel(new URL('../assets/Tree4.gltf', import.meta.url), 10, new THREE.Vector3(-14, 0, 14)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/PalmTree_4.gltf', import.meta.url), 9, new THREE.Vector3(-16, 0, 0)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/Horse.gltf', import.meta.url), 3, new THREE.Vector3(-14, 0, -14)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/PineTree_5.gltf', import.meta.url), 9, new THREE.Vector3(0, 0, 0)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/House_4.gltf', import.meta.url), 9, new THREE.Vector3(14, 0, -14)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/Houses_FirstAge_2_Level3.gltf', import.meta.url), 6, new THREE.Vector3(16, 0, 0)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/Sawmill.gltf', import.meta.url), 7, new THREE.Vector3(14, 0, 14)).then((obstacle => {
    scene.add(obstacle);
}));
addModel(new URL('../assets/Temple_FirstAge_Level3.gltf', import.meta.url), 6, new THREE.Vector3(0, 0, 16)).then((obstacle => {
    scene.add(obstacle);
}));

//---------------------------------- LIGHT AND HELPERS ----------------------------------------------------------------------------

/**
 * Ambient light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/**
 * directional light
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(95, 15, 30);
scene.add(directionalLight);

/**
 * directional light
 */
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(15, 95, 30);
scene.add(directionalLight2);

/**
 * point light
 */
const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// Light Helpers
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

// const directionalLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2);
// scene.add(directionalLightHelper2);

//const pointLightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(pointLightHelper);

//---------------------------------- DAT GUI CONTROLS -----------------------------------------------------------------------

// Dat GUI
const gui = new dat.GUI();

// Directional Light Controls
const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity', 0, 2).name('Intensity');
directionalLightFolder.addColor(directionalLight, 'color').name('Color');
directionalLightFolder.open();

// Directional Light2 Controls
const directionalLightFolder2 = gui.addFolder('Directional Light2');
directionalLightFolder2.add(directionalLight2, 'intensity', 0, 2).name('Intensity');
directionalLightFolder2.addColor(directionalLight2, 'color').name('Color');
directionalLightFolder2.open();

// Point Light Controls
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 2).name('Intensity');
pointLightFolder.addColor(pointLight, 'color').name('Color');
pointLightFolder.open();

//---------------------------------- Yuka Logic Starts -----------------------------------------------------------------------

camera.position.z = 5;

// added one vehicle
const vehicle = new YUKA.Vehicle();
addModel(new URL('../assets/SportsCar.gltf', import.meta.url), 0.2, new THREE.Vector3(0, 0, 0), false).then((car) => {
    scene.add(car);
    vehicle.setRenderComponent(car, sync);
})


// added Another vehicle
const vehicle2 = new YUKA.Vehicle();
addModel(new URL('../assets/SUV.glb', import.meta.url), 0.2, new THREE.Vector3(0, 0, 0), false).then((car) => {
    scene.add(car);
    vehicle2.setRenderComponent(car, sync);
})

const path = new YUKA.Path();

const userEventData = [
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'base',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'idle',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'video',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'searched',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'noted',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'fun',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'visited',
    },
    {
        username: 'ankit.m.ed',
        url: 'https://youtube.com',
        activity: 'base',
    }

]

userEventData.forEach(event => {
    path.add(getCoordinatesWithObstacle(event.activity));
})

const path2 = new YUKA.Path();

const userEventData2 = [
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'idle',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'base',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'searched',
        activity: 'noted',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'video',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'visited',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'fun',
    },
    {
        username: 'flawsophies',
        url: 'https://youtube.com',
        activity: 'idle',
    }

]

userEventData2.forEach(event => {
    path2.add(getCoordinatesWithObstacle(event.activity));
})

path.loop = true;
path2.loop = true;

vehicle.position.copy(path.current());
vehicle2.position.copy(path2.current());

vehicle.maxSpeed = 4;
vehicle2.maxSpeed = 6;

const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5);
vehicle.steering.add(followPathBehavior);

const onPathBehavior = new YUKA.OnPathBehavior(path);
onPathBehavior.radius = 2;
vehicle.steering.add(onPathBehavior);

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

// second Variable
const followPathBehavior2 = new YUKA.FollowPathBehavior(path2, 0.5);
vehicle2.steering.add(followPathBehavior2);

const onPathBehavior2 = new YUKA.OnPathBehavior(path2);
onPathBehavior2.radius = 2;
vehicle2.steering.add(onPathBehavior2);

const entityManager2 = new YUKA.EntityManager();
entityManager2.add(vehicle2);

// path drawing---------------------------------->
// const position = [];
// for (let i = 0; i < path2._waypoints.length; i++) {
//     const waypoint = path2._waypoints[i];
//     position.push(waypoint.x, waypoint.y, waypoint.z);
// }

// const lineGeometry = new THREE.BufferGeometry();
// lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
// const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
// scene.add(lines);

const time = new YUKA.Time();

function animate() {
    const delta = time.update().getDelta();
    entityManager.update(delta);
    entityManager2.update(delta);
    controls.update(); // Update orbital controls
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

