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
const shader = document.querySelector('#shader')
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
            squareDiv.opacity = 0;
            squareDiv.color = 'white';
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
            // Touch event listener
            squareDiv.addEventListener('touchmove', (e) => {
                let firstTouchElement = e.changedTouches[0];
                let targetElement = document.elementFromPoint(firstTouchElement.clientX, firstTouchElement.clientY);
                // ensures that only squareDivs are coloured
                if (canvas.contains(targetElement) && targetElement != canvas) {
                    draw(targetElement, drawColor);
                }

            })            
            rowDiv.append(squareDiv);
        }
    }
}


// variable allows us to draw in any color
let drawColor = 'black';
// Creating a function to draw/change color of divs
function draw(element, drawColor) {
    // An active eraser will override the shader
    // Shader will reset the opacity if trying to shade with a new color
    if (shaderIsActive && !eraserIsActive && (element.color != drawColor)) {
        element.opacity = 0.2;
        element.style.opacity = element.opacity;
    } // elements are limited to an opacity of 1 (100%)
    else if (shaderIsActive && !eraserIsActive && (element.opacity < 1)) {
        element.opacity += 0.2;
        element.style.opacity = element.opacity;
        
    }
    else if (eraserIsActive) {
        element.opacity = 0;
        element.style.opacity = element.opacity;
    }
    else {
        element.opacity = 1;
        element.style.opacity = element.opacity;
    }
    element.color = drawColor;
    element.style.backgroundColor = element.color;
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
let eraserIsActive = false;
let saveColor;
eraser.addEventListener('click', () => {
    if (eraserIsActive) {
        eraserIsActive = false;
        drawColor = saveColor;
    }
    else {
        eraserIsActive = true;
        saveColor = drawColor;
        drawColor = 'white';
    }
    eraser.classList.toggle('button-toggle');
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

// Shading feature
    // If the color of the div we are trying to shade is white
    // draw the colour like we normally do however
    // give each squareDiv an 'opacity' an accumulator that
    // increments by 20.
    // add an if statement in our draw function that will
    // check if our shader button is active, if so, increment
    // opacity accumulator and assign squareDiv opacity 
let shaderIsActive = false;
shader.addEventListener('click', () => {
    if (shaderIsActive) {
        shaderIsActive = false;
    }
    else {
        shaderIsActive = true;
    }
    console.log(shaderIsActive);
    shader.classList.toggle('button-toggle');
})

createCanvas(slider.value);