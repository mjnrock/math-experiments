import Direction from "./Direction.mjs";

export default {
    Direction,

    lookup(enumerator, value) {
        let ret = null;

        Object.entries(enumerator).filter(([ key, val ]) => {
            if(value === val) {
                ret = key;
            }
        });

        return ret;
    }
};