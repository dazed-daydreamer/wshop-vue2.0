const getters = {
    getCurrentComponentIndex: (state) => {
        return state.currentComponentIndex;
    },
    getCurrentComponentItem: (state) => {
        return state.currentComponentItem;
    },
    getCurrentComponentItemFormChange: (state) => {
        return state.currentComponentItemFormChange;
    }
}


export default getters;