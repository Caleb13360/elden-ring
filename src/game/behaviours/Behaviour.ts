import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';

/**
 * A Behaviour represents a kind of objective that an Actor can have.
 * Each implementation of Behaviour returns an Action that the Actor could take to achieve its objective,
 * or null if no useful options are available.
 * 
 * Created by: Riordan D. Alfredo
 */
export interface Behaviour {
    /**
     * A factory for creating actions. Chaining these together can result in an actor performing more complex tasks.
     * @param actor the Actor acting
     * @param map the GameMap containing the Actor
     * @return an Action that actor can perform, or null if actor can't do this.
     */
    getAction(actor: Actor, map: GameMap): Action | null;
}