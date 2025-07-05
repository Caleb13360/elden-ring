import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Behaviour } from './Behaviour.js';
import { DespawnAction } from '../actions/DespawnAction.js';

/**
 * Class that implements a simple reset behaviour that returns a despawn action
 * Created by: Caleb Smith
 */
export class ResetBehavior implements Behaviour {
    /**
     * Used to get the despawn action for the actor from the reset behaviour
     * @param actor the Actor resetting
     * @param map the GameMap containing the Actor
     * @return a despawn action for the actor
     */
    getAction(actor: Actor, map: GameMap): Action {
        return new DespawnAction();
    }
}