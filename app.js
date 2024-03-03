// Html elements
const image = document.querySelector("#image");
const scrollDiv = document.querySelector("#scroll");

// Variable declarations
let clicking = false;
let touching = false;
let previousX;
let previousY;
let maxDimension = 100;
let mainDim;
let npcDim;

// If image is taller than window, height is the main dimensions.
// If image is wider than window, width is the main dimension.
function findDims() {
    const { innerWidth, innerHeight } = window;
    const isHeightLarger = ((innerWidth / innerHeight)
        > (image.naturalWidth / image.naturalHeight));

    mainDim = isHeightLarger ? "height" : "width";
    npcDim = isHeightLarger ? "width" : "height";

    zoom(innerWidth / 2, innerHeight / 2, 1);
}

// Zoom and then rescroll
const zoom = (x, y, zoomAmount) => {
    // Save the current scroll location of the image
    const { scrollLeft, scrollTop } = scrollDiv;

    // Make sure zoom is within limits
    const currentZoom = maxDimension;
    const newZoom = Math.min(1000, Math.max(currentZoom * zoomAmount, 100));
    const zoomRatio = newZoom / currentZoom;
    maxDimension = newZoom;

    // Apply zoom to html element
    image.style.maxWidth = `${maxDimension}vw`;
    image.style.maxHeight = `${maxDimension}vh`;
    image.style[mainDim] = `${maxDimension}v${mainDim[0]}`;
    image.style[npcDim] = `auto`;

    // Scroll the image
    scrollDiv.scrollLeft = ((scrollLeft + x) * zoomRatio) - x;
    scrollDiv.scrollTop = ((scrollTop + y) * zoomRatio) - y;
}

document.addEventListener("wheel", (e) => {
    if (touching) return
    if (e.shiftKey || e.deltaY > 50 || e.deltaY < -50) {
        zoom(e.clientX, e.clientY, Math.sign(e.deltaY) < 0 ? 1.05 : 1 / 1.05,)
    }
});

image.onload = findDims;
window.addEventListener("resize", findDims);

image.addEventListener("dblclick", (e) => {
    if (touching) return
    for (let index = 3; index < (50 * 3); index += 3) {
        setTimeout(() => {
            zoom(e.clientX, e.clientY, 1 / 1.05)
        }, index)
    }
});

// document.addEventListener("touchstart", (e) => {
//     touching = true;
//     console.log(touching);
// });
// document.addEventListener("touchend", (e) => {
//     touching = false;
//     console.log(touching);
// });

scrollDiv.addEventListener("mousedown", (e) => {
    e.preventDefault();
    previousX = e.clientX;
    previousY = e.clientY;
    clicking = true;
});

document.addEventListener("mouseup", (e) => {
    clicking = false;
});

scrollDiv.addEventListener("mousemove", (e) => {
    if (touching) return;
    if (clicking) {
        e.preventDefault();
        scrollDiv.scrollLeft = scrollDiv.scrollLeft + (previousX - e.clientX);
        scrollDiv.scrollTop = scrollDiv.scrollTop + (previousY - e.clientY);
        previousX = e.clientX;
        previousY = e.clientY;
    }
});

scrollDiv.addEventListener("mouseleave", (e) => {
    clicking = false;
});