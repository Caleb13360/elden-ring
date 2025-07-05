import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Behaviour } from './Behaviour.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';
import { DespawnAction } from '../actions/DespawnAction.js';

/**
 * Class that implements the logic behind an enemy automatically despawning
 * Created by: Rvinder Sandhu
 */
export class DespawnBehaviour implements Behaviour {
    /**
     * Allows the behaviour to get the action to despawn the actor
     * @param actor the actor that despawns
     * @param map the GameMap containing the Actor
     * @return the despawn action for the actor, or null if not despawning
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        if (RandomNumberGenerator.getRandomInt(100) > 90) {
            return new DespawnAction();
        } else {
            return null;
        }
    }
}