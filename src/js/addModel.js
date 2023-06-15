import calculateModelSize from "./calculateModelSize";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const addModel = (modelUrl, size, position, matrixAutoUpdate = true) => {
    return new Promise((resolve, reject) => {
        loader.load(modelUrl.href, (gltf) => {
            const model = gltf.scene;

            // setAutoUpdate
            if (!matrixAutoUpdate) {
                model.matrixAutoUpdate = false;
            }

            // Set the desired scale
            const desiredSize = size;
            const currentSize = calculateModelSize(model); // Calculate the current size of the model
            const scale = desiredSize / currentSize;
            model.scale.set(scale, scale, scale);

            // Set the desired position
            const desiredPosition = position;
            model.position.copy(desiredPosition);
            resolve(model);
        }, undefined, function (error) {
            console.error('An error occurred while loading the GLTF file.', error);
            reject(error);
        })
    })
}

export default addModel;