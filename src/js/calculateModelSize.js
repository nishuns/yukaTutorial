import * as THREE from 'three';

// Reusable Function
function calculateModelSize(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    return Math.max(size.x, size.y, size.z);
}

export default calculateModelSize;