import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';

/**
 * An action executed when an actor/type of actor needs to be respawned
 * Created by: Rvinder Sandhu
 */
export class SpawnAction extends Action {
    /**
     * Actor being revived
     */
    private toRevive: Actor;
    /**
     * Location where the actor will be revived
     */
    private whereRevive: Location;

    /**
     * Spawn action constructor
     * @param actor actor to spawn
     * @param location location to spawn
     */
    constructor(actor: Actor, location: Location) {
        super();
        this.toRevive = actor;
        this.whereRevive = location;
    }

    /**
     * Spawns the enemy back to the given location
     * @param actor The actor being spawned
     * @param map The map the actor is on.
     * @returns the string description of the spawning action
     */
    execute(actor: Actor, map: GameMap): string {
        map.addActor(this.toRevive, this.whereRevive);
        return `${this.toRevive} has spawned`;
    }

    /**
     * Describes which actor is spawning
     * @param actor The actor spawning
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Spawn ${actor}`;
    }
}