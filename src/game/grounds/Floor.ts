import { Actor } from './../../engine/actors/Actor.js';
import { Ground } from './../../engine/positions/Ground.js';
import { Status } from '../utility/Status.js';

/**
 * A class that represents the floor inside a building.
 * Created by:
 * Riordan D. Alfredo
 */
export class Floor extends Ground {
    /**
     * Floor constructor
     */
    constructor() {
        super('_');
    }

    /**
     * Returns true if the actor has the capability HOSTILE_TO_ENEMY
     * @param actor the Actor to check
     * @return true if the actor can enter
     */
    canActorEnter(actor: Actor): boolean {
        return actor.hasCapability(Status.HOSTILE_TO_ENEMY);
    }
}