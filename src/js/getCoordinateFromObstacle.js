import * as YUKA from 'yuka';

// Mapping Function
function getCoordinatesWithObstacle(obstacleName) {
    switch (obstacleName) {
        case 'video':
            return new YUKA.Vector3(-14, 0, 14);
        case 'visited':
            return new YUKA.Vector3(-16, 0, 0);
        case 'reading':
            return new YUKA.Vector3(-14, 0, -14);
        case 'idle':
            return new YUKA.Vector3(14, 0, -14);
        case 'fun':
            return new YUKA.Vector3(14, 0, 14);
        case 'searched':
            return new YUKA.Vector3(16, 0, 0);
        case 'noted':
            return new YUKA.Vector3(0, 0, 16);
        default:
            return new YUKA.Vector3(0, 0, 0);
    }
}

export default getCoordinatesWithObstacle;