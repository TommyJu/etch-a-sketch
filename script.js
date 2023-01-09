// Query Selectors --------------------
const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider-value');

// Tracking mouse up and mouse down to a create a hold effect for drawing
let mouseIsDown = false;

body.addEventListener('mouseup', () => {
    mouseIsDown = false;
});
body.addEventListener('mousedown', () => {
    mouseIsDown = true;
});

// Canvas creation --------------------

// controls # of rowDivs and # squareDivs per row are created in the canvas div
let canvasSize = 16;

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

// Grid size slider
    
    // Helper function to clear all children of a DOM element
function clearChildren(element) {
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}
    // Clears all children from the canvas and creates a new one with specified size
slider.oninput = () => {
    //Display slider value text
    sliderValue.textContent = slider.value;
    clearChildren(canvas);
    createCanvas(slider.value);
}

// Color selector


createCanvas(canvasSize);