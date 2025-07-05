import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { ResetManager } from '../reset/ResetManager.js';
import { RuneManager } from '../runes/RuneManager.js';

/**
 * Class representing the action which despawns an actor
 * Created by: Rvinder Sandhu
 */
export class DespawnAction extends Action {
    /**
     * Used to despawn the enemy
     * @param target The actor being despawned
     * @param map The map the actor is on.
     * @returns string description of the despawning
     */
    execute(target: Actor, map: GameMap): string {
        map.removeActor(target);
        if (typeof (target as any).ReleaseRunes === "function") {
            RuneManager.getInstance().removeRuneCarrier(target as unknown as import("../runes/RuneCarrier").RuneCarrier);
        }
        ResetManager.getInstance().removeResettable(target);
        return `${target} has been removed`;
    }

    /**
     * Describes which actor is being despawned
     * @param actor The actor being despawned
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Remove ${actor}`;
    }
}