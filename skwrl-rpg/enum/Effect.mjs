const Effect = {
    POOF: 1
};

export default {
    Effect,

    lookup(value) {
        let ret = null;

        Object.entries(Effect).filter(([ key, val ]) => {
            if(value === val) {
                ret = key;
            }
        });

        return ret;
    }
}