export enum InterfaceActions {
    SWITCH_SHOW
}

export function switchShow() {
    return {
        type: InterfaceActions.SWITCH_SHOW
    }
}

export default InterfaceActions;