"use strict"

let globals = {
    max_trials: 50,
    pass_criteria: 8,
    stages: ['SD', 'CD', 'IDS_1', 'IDS_2', 'IDS_3', 'IDS_4', 'EDS', 'EDSR'],
    shapes: [
        'stimuli/shapes/shape_01.png', 'stimuli/shapes/shape_02.png', 'stimuli/shapes/shape_03.png',
        'stimuli/shapes/shape_04.png', 'stimuli/shapes/shape_05.png', 'stimuli/shapes/shape_06.png',
        'stimuli/shapes/shape_07.png', 'stimuli/shapes/shape_08.png', 'stimuli/shapes/shape_09.png',
        'stimuli/shapes/shape_10.png', 'stimuli/shapes/shape_11.png', 'stimuli/shapes/shape_12.png'
    ],
    lines: [
        'stimuli/lines/line_pattern_01.png', 'stimuli/lines/line_pattern_02.png', 'stimuli/lines/line_pattern_03.png',
        'stimuli/lines/line_pattern_04.png', 'stimuli/lines/line_pattern_05.png', 'stimuli/lines/line_pattern_06.png',
        'stimuli/lines/line_pattern_07.png', 'stimuli/lines/line_pattern_08.png', 'stimuli/lines/line_pattern_09.png',
        'stimuli/lines/line_pattern_10.png', 'stimuli/lines/line_pattern_11.png', 'stimuli/lines/line_pattern_12.png'
    ],
    stimuli:[[0], [1],
            [0,0], [1,0], [0,1], [1,1],
            [2,2], [3,2], [2,3], [3,3],
            [4,4], [5,4], [4,5], [5,5],
            [6,6], [7,6], [6,7], [7,7],
            [8,8], [9,8], [8,9], [9,9],
            [10,10], [11,10], [10,11], [11,11]],
    target_feature: [0, 0, 2, 4, 6, 8, 10, 11]

};

let state = {
    current_dimension: null,
    stage: null,
    trial_number: null,
    shape_1: null,
    shape_2: null,
    line_1: null,
    line_2: null,
    choice: null,
    reward: null,
    S: null,
    feedback: null,
    n_trials: null,
    n_errors: null,
    stages_attempted: null,
    stages_passed: null
};

function initalise_task(){
    state.current_dimension = flip()
    state.stage = 0
    state.trial_number = 1
    setButton()
}

function set_stimuli(){
    if (state.stage == 0){
        s = [globals.stimuli[0], globals.stimuli[1]]
    } else if (state.stage == 1){
        n = 7
        stim1 = 2
    } else if (state.stage == 2){
        n = 15
        stim1 = 6
    } else if (state.stage == 3){
        n = 23
        stim1 = 10
    } else if (state.stage == 4){
        n = 31
        stim1 = 14
    } else if (state.stage == 5){
        n = 39
        stim1 = 18
    } else if (state.stage in [6,7]){
        n = 47
        stim1 = 22
    }

    // get flat list of stimuli from previous 3 and 6 trials
    let prev_3 = S.slice(-3).flat();
    let prev_6 = S.slice(-6).flat();
}

// Function to get the shape and pattern for this trial
function setButton() {
    // check the state
    if (state.stage == 1){
        if (state.current_dimension == 0){
            // shape state
            state.shape_1 = globals.shapes[globals.stimuli[0]]
            state.shape_2 = globals.shapes[globals.stimuli[1]]
            $('#dynamicButton').css('background-image',`url('${state.shape_1}')`);
            $('#dynamicButton_2').css('background-image',`url('${state.shape_2}')`);
        } else {
            state.line_1 = globals.lines[globals.stimuli[0]]
            state.line_2 = globals.lines[globals.stimuli[1]]
            $('#dynamicButton').css('background-image',`url('${state.line_1}')`);
            $('#dynamicButton_2').css('background-image',`url('${state.line_2}')`);
        }
    } else {


    }



    // Set the background images dynamically
    //button.style.backgroundImage = `url('${globals.shapes[shapeIndex]}'), url('${globals.patterns[patternIndex]}')`;
    //button_2.style.backgroundImage = `url('${globals.shapes[shapeIndex_2]}'), url('${globals.patterns[patternIndex_2]}')`;
}

// Call the function when the page loads
window.onload = initalise_task;