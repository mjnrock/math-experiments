import Effect from "./Effect.mjs";
import Creature from "./Creature.mjs";
import EntityState from "./EntityState.mjs";

export default {
    Effect,
    Creature,
    EntityState,

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