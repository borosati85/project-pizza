import NavbarActionTypes from "./navbar.types";

const initialState = {
    hidden: false
}

const navbarReducer = (state=initialState, action) => {
    switch (action.type) {
        case NavbarActionTypes.TOGGLE_NAVBAR_LINKS_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }

        default: return state
    }
}

export default navbarReducer;