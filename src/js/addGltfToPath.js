import calculateModelSize from "./calculateModelSize";

const addGltfToPath = (scene, loader) => (modelUrl, size, position) => {

    loader.load(modelUrl.href, function (gltf) {
        const model = gltf.scene;

        // Set the desired scale
        const desiredSize = size;
        const currentSize = calculateModelSize(model); // Calculate the current size of the model
        const scale = desiredSize / currentSize;
        model.scale.set(scale, scale, scale);

        // Set the desired position
        const desiredPosition = position;
        model.position.copy(desiredPosition);

        scene.add(model);
    }, undefined, function (error) {
        console.error('An error occurred while loading the GLTF file.', error);
    })
}

export default addGltfToPath;