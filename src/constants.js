export const size = {
    width: document.body.offsetWidth,
    height: 600
}

const MapWidth = 1600;

export const mapSize = {
    width: 1600,
    offSet: MapWidth > size.width ? MapWidth - size.width : 0,
    height: 600
}