import { WINDOW_SIZE } from './../actions/actionTypes.js';

const initialState = {
    width: 640,
    height: 480
}

const windowSizeReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case WINDOW_SIZE:
            return { width: payload.width, height: payload.height };

        default:
            return state;
    }
}

export default windowSizeReducer;