const image = document.querySelector(".blue");

const scrollDiv = document.querySelector("#scroll");

let clicking = false;
let previousX;
let previousY;

let determinantDimension;
let recessiveDimension;



const currentEvent = document.querySelector("#currentEvent");
const scrollTopOnScreen = document.querySelector("#scrollTop");
const scrollLeftOnScreen = document.querySelector("#scrollLeft");
const dd = document.querySelector("#width");
const newDd = document.querySelector("#newDd");
// const height = document.querySelector("#height");


// $(document).ready(function () {
//     if (deviceType() == "Mobile")
//         $('#Grid').mixitup('toGrid');
// });


// function deviceType() {
//     var OSName = "Mobile";
//     if (navigator.appVersion.indexOf("Win") != -1 && navigator.appVersion.indexOf("Phone") === -1) OSName = "Windows";
//     if (navigator.appVersion.indexOf("Macintosh") != -1) OSName = "MacOS";
//     if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
//     if (navigator.appVersion.indexOf("Linux") != -1 && navigator.appVersion.indexOf("Android") === -1) OSName = "Linux";
//     if (navigator.appVersion.indexOf("facebook.com") != -1) OSName = "facebook";
//     if (navigator.appVersion.indexOf("bot") != -1) OSName = "bot";
//     if (navigator.appVersion.indexOf("Slerp") != -1) OSName = "bot";
//     return OSName;
// }

// const osName = deviceType();


// if (osName !== "Mobile") {
//     document.querySelector("#zoom").style.backgroundColor = "red";


const findDeterminantDimension = () => {
    const isHeightLarger = ((window.innerWidth / window.innerHeight)
        > (image.naturalWidth / image.naturalHeight));

    determinantDimension = isHeightLarger ? "height" : "width";
    recessiveDimension = isHeightLarger ? "width" : "height";
}

const containImageInWindow = () => {
    image.style[determinantDimension] = "100%";
    image.style[recessiveDimension] = "auto";
}

image.onload = () => {
    findDeterminantDimension();
    containImageInWindow();
};
window.addEventListener("resize", () => {
    currentEvent.innerText = ("resize");
    findDeterminantDimension();
    containImageInWindow()
});

const zoom = (x, y, zoomAmount) => {
    currentEvent.innerText = ("zoom");
    const { scrollLeft, scrollTop } = scrollDiv;
    scrollLeftOnScreen.innerText = (scrollLeft);
    scrollTopOnScreen.innerText = (scrollTop);
    // Compute zoom logic
    const currentZoom = image.style[determinantDimension].slice(0, -1);
    const newZoom = Math.min(1000, Math.max(currentZoom * zoomAmount, 100));
    const zoomRatio = newZoom / currentZoom;
    dd.innerText = (currentZoom); newDd.innerText = (newZoom);
    // Zoom in/out
    image.style[determinantDimension] = `${newZoom}%`
    // Rescroll image
    scrollDiv.scrollLeft = ((scrollLeft + x) * zoomRatio) - x;
    scrollDiv.scrollTop = ((scrollTop + y) * zoomRatio) - y;
    scrollLeftOnScreen.innerText = scrollDiv.scrollLeft;
    scrollTopOnScreen.innerText = scrollDiv.scrollTop;
}

// document.querySelector("#zoom").addEventListener("click", () => {
//     console.log("click");
//     zoom(window.innerWidth / 2, window.innerHeight / 2, 1.05)
// })

document.addEventListener("wheel", (e) => {
    currentEvent.innerText = ("wheel");
    if (!e.shiftKey) {
        currentEvent.innerText = ("wheel && shiftKey == false");
        return;
    }
    zoom(e.clientX, e.clientY, Math.sign(e.deltaY) < 0 ? 1.05 : 1 / 1.05,)
});


image.addEventListener("dblclick", (e) => {
    currentEvent.innerText = ("dblclick");
    image.style[determinantDimension] = "100%";
    scrollLeftOnScreen.innerText = scrollDiv.scrollLeft;
    scrollTopOnScreen.innerText = scrollDiv.scrollTop;
    dd.innerText = (image.style[determinantDimension].slice(0, -1));
});


scrollDiv.addEventListener("mousedown", (e) => {
    currentEvent.innerText = ("mousedown");
    scrollLeftOnScreen.innerText = scrollDiv.scrollLeft;
    scrollTopOnScreen.innerText = scrollDiv.scrollTop;
    dd.innerText = (image.style[determinantDimension].slice(0, -1));
    e.preventDefault();
    previousX = e.clientX;
    previousY = e.clientY;
    clicking = true;
});

document.addEventListener("mouseup", (e) => {
    currentEvent.innerText = ("mouseup");
    clicking = false;
});

scrollDiv.addEventListener("mousemove", (e) => {
    currentEvent.innerText = ("mousemove");
    if (clicking) {
        currentEvent.innerText = ("mousemove && clicking === true");
        e.preventDefault();
        scrollDiv.scrollLeft = scrollDiv.scrollLeft + (previousX - e.clientX);
        scrollDiv.scrollTop = scrollDiv.scrollTop + (previousY - e.clientY);
        previousX = e.clientX;
        previousY = e.clientY;
        scrollLeftOnScreen.innerText = scrollDiv.scrollLeft;
        scrollTopOnScreen.innerText = scrollDiv.scrollTop;
    }
});



scrollDiv.addEventListener("mouseleave", (e) => {
    currentEvent.innerText = ("mouseleave");
    clicking = false;
});

// } else {
//     document.querySelector("#zoom").style.backgroundColor = "blue";
// }

