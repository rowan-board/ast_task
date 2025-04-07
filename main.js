"use strict"

let globals = {
    shapes: [
        'stimuli/shapes/shape_01.png', 'stimuli/shapes/shape_02.png', 'stimuli/shapes/shape_03.png',
        'stimuli/shapes/shape_04.png', 'stimuli/shapes/shape_05.png', 'stimuli/shapes/shape_06.png',
        'stimuli/shapes/shape_07.png', 'stimuli/shapes/shape_08.png', 'stimuli/shapes/shape_09.png',
        'stimuli/shapes/shape_10.png', 'stimuli/shapes/shape_11.png', 'stimuli/shapes/shape_12.png'
    ],
    patterns: [
        'stimuli/lines/line_pattern_01.png', 'stimuli/lines/line_pattern_02.png', 'stimuli/lines/line_pattern_03.png',
        'stimuli/lines/line_pattern_04.png', 'stimuli/lines/line_pattern_05.png', 'stimuli/lines/line_pattern_06.png',
        'stimuli/lines/line_pattern_07.png', 'stimuli/lines/line_pattern_08.png', 'stimuli/lines/line_pattern_09.png',
        'stimuli/lines/line_pattern_10.png', 'stimuli/lines/line_pattern_11.png', 'stimuli/lines/line_pattern_12.png'
    ]

};

let state = {

};


// Function to randomly pick a shape and a pattern
function setRandomButtonBackground() {
    const shapeIndex = Math.floor(Math.random() * globals.shapes.length);
    const patternIndex = Math.floor(Math.random() * globals.patterns.length);

    const button = document.getElementById('dynamicButton');

    const shapeIndex_2 = Math.floor(Math.random() * globals.shapes.length);
    const patternIndex_2 = Math.floor(Math.random() * globals.patterns.length);

    const button_2 = document.getElementById('dynamicButton_2');

    // Set the background images dynamically
    button.style.backgroundImage = `url('${globals.shapes[shapeIndex]}'), url('${globals.patterns[patternIndex]}')`;
    button_2.style.backgroundImage = `url('${globals.shapes[shapeIndex_2]}'), url('${globals.patterns[patternIndex_2]}')`;
}

// Call the function when the page loads
window.onload = setRandomButtonBackground;