// Array to store the pages (Hello Kitty images or just placeholders for this version)
let pages = [
    'hello_kitty_1.jpg', // Placeholder names, replace with actual image paths or designs
    'hello_kitty_2.jpg',
    'hello_kitty_3.jpg',
    'hello_kitty_4.jpg',
    'hello_kitty_5.jpg',
    // Add more pages until 100
];

let currentPage = 0;
let selectedColor = 'red';
let isDrawing = false; // Flag to check if the user is drawing
let isEraser = false; // Flag to check if the eraser is active
let lastX = 0, lastY = 0; // To store the last mouse position for smooth drawing

// Define the allowed coloring area (rectangle for simplicity)
const coloringArea = {
    x: 100, y: 100, // Starting point (x, y)
    width: 800, height: 800, // Area width and height
};

// Function to load the current page (in this case, a canvas)
function loadPage() {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the background or drawing style for the page (you can replace this with real images)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the coloring area rectangle to indicate the allowed drawing area
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(coloringArea.x, coloringArea.y, coloringArea.width, coloringArea.height); // Placeholder rectangle for "Hello Kitty" image area
}

// Function to select a color and display the selected color name
function selectColor(color) {
    selectedColor = color;
    document.getElementById('color-name').textContent = color.charAt(0).toUpperCase() + color.slice(1); // Update the displayed color name
    isEraser = false; // Disable eraser when a color is selected
    document.getElementById('eraser-btn').classList.remove('active'); // Deactivate the eraser button
}

// Function to toggle the eraser
function toggleEraser() {
    isEraser = !isEraser;
    if (isEraser) {
        document.getElementById('eraser-btn').classList.add('active'); // Show eraser is active
    } else {
        document.getElementById('eraser-btn').classList.remove('active'); // Eraser is inactive
    }
}

// Function to change page (left and right arrows)
function changePage(direction) {
    currentPage = (currentPage + direction + pages.length) % pages.length;
    loadPage();
}

// Function to start drawing (mousedown)
function startDrawing(event) {
    // Check if the click is inside the coloring area
    if (isInsideColoringArea(event)) {
        isDrawing = true;
        lastX = event.clientX - event.target.offsetLeft;
        lastY = event.clientY - event.target.offsetTop;
    }
}

// Function to draw on the canvas (mousemove)
function draw(event) {
    if (!isDrawing) return;

    const canvas = event.target;
    const ctx = canvas.getContext('2d');
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    // Only draw if the mouse is within the coloring area
    if (isInsideColoringArea(event)) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        if (isEraser) {
            // Erase by painting white (background color)
            ctx.lineWidth = 20; // Eraser size (adjustable)
            ctx.strokeStyle = 'white';
        } else {
            // Color normally
            ctx.lineWidth = 5;
            ctx.strokeStyle = selectedColor;
        }

        ctx.lineTo(x, y);
        ctx.lineCap = 'round'; // Smooth edges
        ctx.stroke();

        // Update the last position for the next movement
        lastX = x;
        lastY = y;
    }
}

// Function to stop drawing (mouseup)
function stopDrawing() {
    isDrawing = false;
}

// Function to check if the mouse is inside the coloring area
function isInsideColoringArea(event) {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;

    return x >= coloringArea.x && x <= coloringArea.x + coloringArea.width &&
           y >= coloringArea.y && y <= coloringArea.y + coloringArea.height;
}

// Add event listeners to the canvas to handle mouse events
const canvas = document.getElementById('coloringCanvas');
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing); // To stop drawing if the mouse leaves the canvas

// Initial page load
loadPage();
