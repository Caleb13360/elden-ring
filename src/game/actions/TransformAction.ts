import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';

/**
 * An action executed when an actor/type of actor needs to be transformed
 * Created by: Rvinder Sandhu
 */
export class TransformAction extends Action {
    /**
     * Actor being transformed into
     */
    private toRevive: Actor;
    /**
     * Location where the actor will be revived
     */
    private whereRevive: Location;

    /**
     * Transform action constructor
     * @param actor actor to spawn
     * @param location location to spawn
     */
    constructor(actor: Actor, location: Location) {
        super();
        this.toRevive = actor;
        this.whereRevive = location;
    }

    /**
     * Transform the enemy back at the given location
     * @param actor The actor being transformed
     * @param map The map the actor is on.
     * @returns the string description of the spawning action
     */
    execute(actor: Actor, map: GameMap): string {
        map.addActor(this.toRevive, this.whereRevive);
        return `${actor} has transformed into ${this.toRevive}`;
    }

    /**
     * Describes actor to transform into
     * @param actor The actor to transform into
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Transform into ${actor}`;
    }
}