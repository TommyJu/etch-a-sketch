// Query Selectors --------------------
const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider-value');
const eraser = document.querySelector('#eraser');
const drawBlack = document.querySelector('#draw-black');
const colorPicker = document.querySelector('#color-picker');
const previousColorDivs = document.querySelectorAll('#color-1, #color-2, #color-3, #color-4, #color-5');
const clearCanvas = document.querySelector('#clear-canvas');
// Tracking mouse up and mouse down to a create a hold effect for drawing
let mouseIsDown = false;

body.addEventListener('mouseup', () => {
    mouseIsDown = false;
});
body.addEventListener('mousedown', () => {
    mouseIsDown = true;
});

// Canvas creation --------------------

function createCanvas(canvasSize) {
    // Creates rowDivs and appends to canvas
    for (let i = 0; i < canvasSize; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row-div');
        canvas.append(rowDiv);
        // Creates square divs and appends to each rowDiv
        for (let i = 0; i < canvasSize; i++) {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square-div');
            // Event listeners for square divs
                //Activates when user holds mousedown and drags mouse over square
            squareDiv.addEventListener('mouseover', (e) => {
                if (mouseIsDown) {
                    draw(e.target, drawColor);
                }
            })
            // Activates when user clicks on square or mousedowns on a square
            squareDiv.addEventListener('mousedown', (e) => {
                draw(e.target, drawColor);
            })            
            rowDiv.append(squareDiv);
        }
    }
}


// variable allows us to draw in any color
let drawColor = 'black';

// Creating a function to draw/change color of divs
function draw(element, drawColor) {
    console.log(element);
    element.style.backgroundColor = drawColor;
};

// User controls --------------------------------------
// Grid size slider
    
    // Helper function to clear all children of a DOM element
function clearChildren(element) {
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}
// Initial slider value text
sliderValue.textContent = `${slider.value} x ${slider.value}`;
// Clears all children from the canvas and creates a new one with specified size
slider.onchange = () => {
    
    clearChildren(canvas);
    createCanvas(slider.value);
}
//Display slider value text
slider.oninput = () => {
    sliderValue.textContent = `${slider.value} x ${slider.value}`;
}

eraser.addEventListener('click', () => {
    drawColor = 'white';
})

drawBlack.addEventListener('click', () => {
    drawColor = 'black';
})

// Color selector
colorPicker.oninput = () => {
    drawColor = colorPicker.value;
}
colorPicker.addEventListener('click', () => {
    drawColor = colorPicker.value;
    //prevents the same color from being added to the array twice
    if (colorPicker.value != previousColors[4]) {
        previousColors.shift();
        previousColors.push(drawColor);
        previousColorDivs.forEach((colorDiv, index) => {
            colorDiv.style.backgroundColor = previousColors[index];
        })
    }
})

// Previous colors
    // previous color stored as background color of divs in previousColorDivs
    // We can have a 5 element array that stores the 5 previous colors as hex values
    // on click from the color wheel, push the color value onto array and delete
    // the first value. Then, overwrite the prevColor divs background colors
    // according to the array,

let previousColors = ['white', 'white', 'white', 'white', 'white'];
previousColorDivs.forEach((colorDiv) => {
    colorDiv.addEventListener('click', () => {
        drawColor = colorDiv.style.backgroundColor;
    })
})

// Clear canvas

clearCanvas.addEventListener('click', () => {
    clearChildren(canvas);
    createCanvas(slider.value);
});

createCanvas(slider.value);