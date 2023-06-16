import * as YUKA from 'yuka';

// Mapping Function
function getCoordinatesWithObstacle(obstacleName) {
    switch (obstacleName) {
        case 'WATCHED':
            return new YUKA.Vector3(-14, 0, 14);
        case 'VISITED':
            return new YUKA.Vector3(-16, 0, 0);
        case 'SEARCHED':
            return new YUKA.Vector3(-14, 0, -14);
        case 'IDLE':
            return new YUKA.Vector3(14, 0, -14);
        case 'EXPLORED':
            return new YUKA.Vector3(14, 0, 14);
        case 'NOTED':
            return new YUKA.Vector3(16, 0, 0);
        case 'GRAPH':
            return new YUKA.Vector3(0, 0, 16);
        default:
            return new YUKA.Vector3(0, 0, 0);
    }
}

export default getCoordinatesWithObstacle;