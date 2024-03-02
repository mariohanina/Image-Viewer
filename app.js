const image = document.querySelector("#image");
const scrollDiv = document.querySelector("#scroll");
const eventFired = document.querySelector("#eventFired");

let clicking = false;
let touching = false;
let previousX;
let previousY;
let maxDimension = 100;

const zoom = (x, y, zoomAmount) => {
    const { scrollLeft, scrollTop } = scrollDiv;

    const currentZoom = maxDimension;
    const newZoom = Math.min(500, Math.max(currentZoom * zoomAmount, 100));
    const zoomRatio = newZoom / currentZoom;

    maxDimension = newZoom;
    image.style.maxWidth = `${maxDimension}vw`;
    image.style.maxHeight = `${maxDimension}vh`;

    scrollDiv.scrollLeft = ((scrollLeft + x) * zoomRatio) - x;
    scrollDiv.scrollTop = ((scrollTop + y) * zoomRatio) - y;
}

document.addEventListener("wheel", (e) => {
    if (touching) {
        return;
    }
    eventFired.innerText = "wheel";
    if (e.shiftKey || e.deltaY > 50 || e.deltaY < -50) {
        zoom(e.clientX, e.clientY, Math.sign(e.deltaY) < 0 ? 1.05 : 1 / 1.05,)
    }
});


image.addEventListener("dblclick", (e) => {
    if (touching) {
        return;
    }
    for (let index = 5; index < (35 * 5); index += 5) {
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
    if (touching) {
        return;
    }
    eventFired.innerText = "mousemove";
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