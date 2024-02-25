const image = document.querySelector(".blue");

let imageWidth;
let imageHeight;

const findDeterminantDimension = () => {
    imageWidth = image.naturalWidth;
    imageHeight = image.naturalHeight;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ((windowWidth / windowHeight) > (imageWidth / imageHeight)) {
        image.style.height = "100%"
    } else {
        image.style.width = "100%"
    }
}

image.onload = findDeterminantDimension;





const scrollDiv = document.querySelector("#scroll");
var clicking = false;
var previousX;
var previousY;

scrollDiv.addEventListener("mousedown", (e) => {
    console.log("mousedown");
    e.preventDefault();
    previousX = e.clientX;
    previousY = e.clientY;
    clicking = true;
    console.log(previousX);
    console.log(previousY);
    console.log(clicking);
});

document.addEventListener("mouseup", (e) => {
    console.log("mouseup");
    clicking = false;
    console.log(clicking);
});

scrollDiv.addEventListener("mousemove", (e) => {
    if (clicking) {
        e.preventDefault();
        var directionX = (previousX - e.clientX) > 0 ? 1 : -1;
        var directionY = (previousY - e.clientY) > 0 ? 1 : -1;
        // scrollDiv.scrollLeft = scrollDiv.scrollLeft + 10 * directionX;
        // scrollDiv.scrollTop = scrollDiv.scrollTop + 10 * directionY;
        scrollDiv.scrollLeft = scrollDiv.scrollLeft + (previousX - e.clientX);
        scrollDiv.scrollTop = scrollDiv.scrollTop + (previousY - e.clientY);
        previousX = e.clientX;
        previousY = e.clientY;
    }
});



scrollDiv.addEventListener("mouseleave", (e) => {
    console.log("mouseleave");
    clicking = false;
});