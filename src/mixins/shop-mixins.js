import { mapGetters, mapMutations, mapActions } from "vuex";

//店铺Mixin
export const shopMixins = {
    methods: {
        ...mapMutations(['setCurrentComponentIndex', 'setCurrentComponentItem', 'setCurrentComponentItemFormChange']),
        ...mapActions(['feedBackForm']),
    },
    computed: {
        ...mapGetters(['getCurrentComponentIndex', 'getCurrentComponentItem', 'getCurrentComponentItemFormChange'])
    },
}