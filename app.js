const image = document.querySelector("#image");
const scrollDiv = document.querySelector("#scroll");
const eventFired = document.querySelector("#eventFired");

let clicking = false;
let touching = false;
let previousX;
let previousY;
image.style.scale = "1";

const centerImage = () => {
    const topMargin = Math.max(0, (window.innerHeight -
        (image.clientHeight * image.style.scale)) / 2);

    const leftMargin = Math.max(0, (window.innerWidth -
        (image.clientWidth * image.style.scale)) / 2);

    image.style.marginTop = `${topMargin}px`;
    image.style.marginLeft = `${leftMargin}px`;
}

image.onload = centerImage;
window.addEventListener("resize", centerImage);

const zoom = (x, y, zoomAmount) => {
    const { scrollLeft, scrollTop } = scrollDiv;

    const currentZoom = image.style.scale;
    const newZoom = Math.min(10, Math.max(currentZoom * zoomAmount, 1));
    const zoomRatio = newZoom / currentZoom;

    image.style.scale = newZoom;
    centerImage();

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
    eventFired.innerText = "dblclick";
    image.style.scale = "1";
    centerImage();
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

// document.addEventListener("touchend", (e) => {
//     touching = false
// });

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