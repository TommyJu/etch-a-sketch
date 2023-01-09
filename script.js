// Canvas creation
const canvas = document.querySelector('#canvas');

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
            rowDiv.append(squareDiv);
        }
    }
}

createCanvas(canvasSize);