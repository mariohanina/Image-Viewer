const image = document.querySelector("#image");
const scrollDiv = document.querySelector("#scroll");

let clicking = false;
let touching = false;
let previousX;
let previousY;
let maxDimension = 100;
let detDim;
let recDim;

function findDims() {
    const isHeightLarger = ((window.innerWidth / window.innerHeight)
        > (image.naturalWidth / image.naturalHeight));

    detDim = isHeightLarger ? "height" : "width";
    recDim = isHeightLarger ? "width" : "height";

    zoom(window.innerWidth / 2, window.innerHeight / 2, 1)
}

image.onload = findDims;
window.addEventListener("resize", findDims);


const zoom = (x, y, zoomAmount) => {
    const { scrollLeft, scrollTop } = scrollDiv;

    const currentZoom = maxDimension;
    const newZoom = Math.min(1000, Math.max(currentZoom * zoomAmount, 100));
    const zoomRatio = newZoom / currentZoom;

    maxDimension = newZoom;
    image.style.maxWidth = `${maxDimension}vw`;
    image.style.maxHeight = `${maxDimension}vh`;
    image.style[detDim] = `${maxDimension}v${detDim[0]}`;
    image.style[recDim] = `auto`;

    scrollDiv.scrollLeft = ((scrollLeft + x) * zoomRatio) - x;
    scrollDiv.scrollTop = ((scrollTop + y) * zoomRatio) - y;
}

document.addEventListener("wheel", (e) => {
    if (touching) return
    if (e.shiftKey || e.deltaY > 50 || e.deltaY < -50) {
        zoom(e.clientX, e.clientY, Math.sign(e.deltaY) < 0 ? 1.05 : 1 / 1.05,)
    }
});


image.addEventListener("dblclick", (e) => {
    if (touching) return
    for (let index = 3; index < (50 * 3); index += 3) {
        setTimeout(() => {
            zoom(e.clientX, e.clientY, 1 / 1.05)
        }, index)
    }
});


document.addEventListener("touchstart", (e) => {
    touching = true
});

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