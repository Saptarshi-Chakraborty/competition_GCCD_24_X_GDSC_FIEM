const fileInput = document.getElementById('fileInput');
const image = document.getElementById('image');
const imageControlBox = document.getElementById('image-control-box');
const fileInputBox = document.getElementById('file-input-box');
const cardImageBox = document.getElementById('card-image-box');

const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const saturateInput = document.getElementById('saturate');
const sepiaInput = document.getElementById('sepia');


let brightness = 100, contrast = 100, saturate = 100, sepia = 0;

function displayImage() {
    const fileInput = document.getElementById('fileInput');
    const imageElement = document.getElementById('image');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];

        // Check if the selected file is an image
        if (file.type.match('image.*')) {
            const reader = new FileReader();

            // Read the file as a data URL
            reader.readAsDataURL(file);

            // Set the image source when the file has finished loading
            reader.onload = function () {
                imageElement.src = reader.result;

                console.log(fileInputBox);
                fileInputBox.style.display = 'none';
                imageControlBox.classList.remove('d-none');
                cardImageBox.classList.remove('d-none');


            };


        } else {
            alert('Please select an image file.');
        }
    } else {
        alert('Please select a file.');
    }
}

function changeBrightness() {
    brightness = brightnessInput.value;

    updateFilter();
}

function changeContrast() {
    contrast = contrastInput.value;

    updateFilter();
}

function changeSaturation() {
    saturate = saturateInput.value;

    updateFilter();
}

function changeSepia() {
    sepia = sepiaInput.value;

    updateFilter();
}


function updateFilter() {
    image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%)`;
}

function resetImage() {
    brightness = 100;
    contrast = 100;
    saturate = 100;
    sepia = 0;

    brightnessInput.value = brightness;
    contrastInput.value = contrast;
    saturateInput.value = saturate;
    sepiaInput.value = sepia;

    updateFilter();
}

function downloadImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx && image) {
        canvas.width = image.naturalWidth; // Set canvas width to the original width of the image
        canvas.height = image.naturalHeight; // Set canvas height to the original height of the image

        // Apply the filter to the image
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%)`;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
}
