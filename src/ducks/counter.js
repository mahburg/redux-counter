// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = false;

var initialState = {
    currentValue: 0,
    pastValues: [],
    futureValues: []
}
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';
const RESET = 'RESET';

export function increment(amt) {
    return {
        type: INCREMENT,
        payload: amt
    }
}
export function decrement(amt) {
    return {
        type: DECREMENT,
        payload: amt
    }
}
export function undo() {
    return {
        type: UNDO
    }
}
export function redo() {
    return {
        type: REDO
    }
}
export function reset() {
    return {
        type: RESET
    }
}

function reducer(state = initialState, action) {
    let state = Object.assign(state, {lastAction: action});
    let pv = state.pastValues.slice();
    let fv = state.futureValues.slice();
    let temp;
    switch (action.type){
        case INCREMENT:
            pv.push(state.currentValue);
            return Object.assign({}, state, {
                pastValues: pv,
                currentValue: state.currentValue + action.payload,
                futureValues: []
            });
        case DECREMENT:
            pv.push(state.currentValue);
            return Object.assign({}, state, {
                pastValues: pv,                
                currentValue: state.currentValue - action.payload,
                futureValues: []
            });
        case UNDO:
            fv.push(state.currentValue);
            temp = pv.pop();
            return Object.assign({}, state, {
                pastValues: pv,
                futureValues: fv,
                currentValue: temp
            });
        case REDO:
            pv.push(state.currentValue);
            temp = fv.pop();
            return Object.assign({}, state, {
                pastValues: pv,
                futureValues: fv,
                currentValue: temp
            });
        case RESET:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}

export default reducer;