const mutations = {
    setCurrentComponentIndex: (state, index) => {
        state.currentComponentIndex = index;
    },
    setCurrentComponentItem: (state, item) => {
        state.currentComponentItem = item;
    },
    setCurrentComponentItemFormChange: (state, type) => {
        state.currentComponentItemFormChange = type;
    }
}


export default mutations;