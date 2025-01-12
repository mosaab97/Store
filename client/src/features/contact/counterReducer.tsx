export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export interface CounterState {
    data: number;
    title: string
}

const initState: CounterState = {
    data: 10,
    title: 'another counter'
}


export const increment = (amount = 1) => {
    return {
        type: INCREMENT,
        payload: amount
    }
}

export const decrement = (amount = 1) => {
    return {
        type: DECREMENT,
        payload: amount
    }
}

export default function counterReducer(state = initState, action: any) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state;
    }
}