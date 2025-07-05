import { Ground } from './Ground.js';
import { GroundFactory } from './GroundFactory.js';

/**
 * Class that can create different types of Ground based on the character that represents it.
 */
export class FancyGroundFactory implements GroundFactory {
    private map: Map<string, () => Ground> = new Map();

    /**
     * Constructor.
     *
     * Takes a collection of Ground and puts together a lookup table that will allow
     * instantiation of Ground subclass objects based on lookup of the character
     * that represents them.
     *
     * @param groundTypes A collection of all types of ground required for a GameMap
     */
    constructor(...groundTypes: Ground[]) {
        for (const ground of groundTypes) {
            // Assumes each Ground subclass has a parameterless constructor
            const groundClass = ground.constructor as { new (): Ground };
            this.map.set(ground.getDisplayChar(), () => new groundClass());
        }
    }

    /**
     * Given a character, returns a new instance of the Ground type represented by it.
     *
     * @param displayChar character that represents this Ground in the UI
     * @return an instance of a concrete subclass of Ground
     */
    newGround(displayChar: string): Ground {
        const creator = this.map.get(displayChar);
        if (creator) {
            return creator();
        }
        throw new Error(`No Ground type registered for display char: ${displayChar}`);
    }
}