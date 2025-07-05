import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';

/**
 * A class that represents a wall
 * Created by:
 * Riordan D. Alfredo
 */
export class Wall extends Ground {
    /**
     * Wall constructor
     */
    constructor() {
        super('#');
    }

    /**
     * Returns false as no actor can enter a wall
     * @param actor the Actor to check
     * @return false
     */
    canActorEnter(actor: Actor): boolean {
        return false;
    }

    /**
     * Returns true as walls block every kind of thrown object
     * @return true
     */
    blocksThrownObjects(): boolean {
        return true;
    }
}