const canvas = document.getElementById(board)
const ctx = canvas.getContext('2d');

const updateAll = () => {
 // makes a continous loop so my game can be constantly refreshed
 // allows for movement and updating of the canvas
    window.requestAnimationFrame(updateAll)
}

window.onload = () => {
    window.requestAnimationFrame(updateAll)
}