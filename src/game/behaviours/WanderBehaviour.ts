import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Behaviour } from './Behaviour.js';

/**
 * Created by:
 * Riordan D. Alfredo
 */
export class WanderBehaviour implements Behaviour {
    /**
     * Returns a MoveAction to wander to a random location, if possible.
     * If no movement is possible, returns null.
     *
     * @param actor the Actor enacting the behaviour
     * @param map the map that actor is currently on
     * @return an Action, or null if no MoveAction is possible
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        const actions: Action[] = [];

        for (const exit of map.locationOf(actor).getExits()) {
            const destination = exit.getDestination();
            if (destination.canActorEnter(actor)) {
                const moveAction = destination.getMoveAction(actor, "around", exit.getHotKey());
                if (moveAction) {
                    actions.push(moveAction);
                }
            }
        }

        if (actions.length > 0) {
            const randomIndex = Math.floor(Math.random() * actions.length);
            return actions[randomIndex];
        } else {
            return null;
        }
    }
}