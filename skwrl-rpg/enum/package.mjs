import Effect from "./Effect.mjs";
import Creature from "./Creature.mjs";

export default {
    Effect,
    Creature,

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