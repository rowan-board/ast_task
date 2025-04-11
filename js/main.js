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
    target_feature: [0, 0, 2, 4, 6, 8, 10, 11],
    feedback_delay: 1000
};

let state = {
    subject_nr: null,
    t_start_experiment: null,
    t_start_trial: null,
    t_response: null,
    current_dimension: null,
    stage: null,
    trial_number: null,
    target_feature: null,
    shape_1: null,
    shape_2: null,
    line_1: null,
    line_2: null,
    choice: [],
    reward: null,
    S: null,
    feedback: null,
    n_trials: null,
    n_errors: null,
    stages_attempted: null,
    stages_passed: null
};

// object containing trial history so we can update stimuli and blocks according to rules
let memory = {
    S: [],
    reward: []
}

function ready(){
    state.subject_nr = get_subject_nr();
    console.log('Ready!');
    $('#gorilla').children().hide();
    state.t_start_experiment = Date.now();
    $('#gorilla, #start').show();
    $('#start-btn').on('click', initialise_task);
}

function initialise_task(){
    $('#start').hide();
    state.current_dimension = flip();
    state.stage = 0;
    state.trial_number = 0;
    start_trial();
}

function start_trial(){
    $('#end-block').hide();
    state.t_start_trial = Date.now();
    // if 0 then shapes
    if (state.current_dimension == 0){
        state.target_feature = globals.shapes[globals.target_feature[state.stage]];
    } else {
        state.target_feature = globals.lines[globals.target_feature[state.stage]];
    }
    set_stimuli();
}

function set_stimuli(){

    let s = [];
    let n = 0;
    let stim1 = 0;

    if (state.stage == 0){
        s = [globals.stimuli[0], globals.stimuli[1]];
    } else {
        if (state.stage == 1){
            n = 7;
            stim1 = 2;
        } else if (state.stage == 2){
            n = 15;
            stim1 = 6;
        } else if (state.stage == 3){
            n = 23;
            stim1 = 10;
        } else if (state.stage == 4){
            n = 31;
            stim1 = 14;
        } else if (state.stage == 5){
            n = 39;
            stim1 = 18;
        } else if (state.stage in [6,7]){
            n = 47;
            stim1 = 22;
        }

        // get flat list of stimuli from previous 3 and 6 trials
        let prev_3 = memory.S.slice(-3).flat();
        let prev_6 = memory.S.slice(-6).flat();

        let rep = 0;

        for (let i = stim1; i < stim1 + 2; i++) {
            let x = globals.stimuli[i];

            let countPrev3 = prev_3.filter(stim => stim === x).length;
            let countPrev6 = prev_6.filter(stim => stim === x).length;

            if (countPrev3 >= 3 || countPrev6 >= 4) {
                rep = 1;

                let stimremain = globals.stimuli.slice(stim1, stim1 + 4).filter(stim => {
                    return stim !== x && stim !== globals.stimuli[globals.stimuli.length - 1 - globals.stimuli.indexOf(x)];
                });

                s[0] = stimremain[Math.floor(Math.random() * stimremain.length)];
                s[1] = globals.stimuli[n - globals.stimuli.indexOf(s[0])];
                break;
            }
        }

        if (rep == 0){
            let tmp_stim = globals.stimuli.slice(stim1, stim1+4);
            console.log('s0: ',tmp_stim[Math.floor(Math.random() * tmp_stim.length)]);
            console.log('s1: ',globals.stimuli[n - globals.stimuli.indexOf(s[0])]);
            s[0] = tmp_stim[Math.floor(Math.random() * tmp_stim.length)];
            s[1] = globals.stimuli[n - globals.stimuli.indexOf(s[0])];
        }
    }

    // save stimuli
    memory.S.push(s);
    state.S = s;
    set_button();
}

// Function to get the shape and pattern for this trial
function set_button() {
    // check the state
    if (state.stage == 0){
        if (state.current_dimension == 0){
            // shape state
            state.shape_1 = globals.shapes[state.S[0]];
            state.shape_2 = globals.shapes[state.S[1]];
            // set stimulus in button dynamically 
            $('#dynamicButton').css('background-image',`url('${state.shape_1}')`);
            $('#dynamicButton_2').css('background-image',`url('${state.shape_2}')`);
        } else {
            // line state
            state.line_1 = globals.lines[state.S[0]];
            state.line_2 = globals.lines[state.S[1]];
            $('#dynamicButton').css('background-image',`url('${state.line_1}')`);
            $('#dynamicButton_2').css('background-image',`url('${state.line_2}')`);
        }
    } else {
        // now do this for all states after simple discrimination, we have compound stimuli now
        state.shape_1 = globals.shapes[state.S[0][0]];
        state.shape_2 = globals.shapes[state.S[1][0]];
        state.line_1 = globals.lines[state.S[0][1]];
        state.line_2 = globals.lines[state.S[1][1]];   
        $('#dynamicButton').css('background-image',`url('${state.shape_1}'), url('${state.line_1}')`);
        $('#dynamicButton_2').css('background-image',`url('${state.shape_2}'), url('${state.line_2}')`);
    }

    // Randomize which button goes on the left
    if (Math.random() < 0.5) {
        $('#stimuli').append($('#dynamicButton'));
        $('#stimuli').append($('#dynamicButton_2'));
    } else {
        $('#stimuli').append($('#dynamicButton_2'));
        $('#stimuli').append($('#dynamicButton'));
    }

    // now let's show
    $('#stimuli').show();
    $('#stimuli').one('click', get_response);
}

function get_response(e){
    $('#stimuli').off('click');
    let t = state.t_response = Date.now();
    // Which button was clicked?
    let btn = $(e.target)[0].id;
    if (btn == 'dynamicButton'){
        state.choice = [state.shape_1, state.line_1];
    } else {
        state.choice = [state.shape_2, state.line_2];
    }

    console.log(state.choice);
    // was it correct
    if (state.choice.includes(state.target_feature)){
        state.reward = 1;
    } else {
        state.reward = 0;
    }
    // append to outcome to memory
    memory.reward.push(state.reward);
    setTimeout(show_feedback, globals.feedback_delay);
}

function show_feedback(){
    // first hide stimuli then show feedback
    $('#stimuli').hide()
    if (state.reward == 1){
        $('#good-feedback').show();
    } else {
        $('#bad-feedback').show();
    }
    setTimeout(log_data, globals.feedback_delay);
}

function log_data(){
    $('#good-feedback').hide();
    $('#bad-feedback').hide();
    primate.metric(state);
    state.trial_number +=1;
    let r = memory.reward.slice(-8).flat();
    let sum = r.reduce((acc, currentValue) => acc + currentValue, 0);
    // check if last 8 in a row are correct
    if (sum == 8){
        state.stage += 1;
        block_reset();
    } else {
        start_trial();
    }
}

function block_reset(){
    // reset reward memory at end of block
    memory.reward = [];
    $('#end-block').show();
    setTimeout(start_trial, globals.feedback_delay);
}



// Call the function when the page loads
window.onload = ready;