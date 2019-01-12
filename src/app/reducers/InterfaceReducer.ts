import {SWITCH_SHOW} from "../actions/InterfaceActions";

export function interfaceReducer(state = {asideMenuIsShow: true}, action: any) {
    switch (action.type) {
        case SWITCH_SHOW:
            return {
                ...state,
                asideMenuIsShow: !state.asideMenuIsShow
            };
        default: return state;
    }
}