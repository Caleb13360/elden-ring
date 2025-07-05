import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Behaviour } from './Behaviour.js';
import { TransformAction } from '../actions/TransformAction.js';

/**
 * Behaviour that transforms a PileOfBones back into another actor after a few rounds.
 * Created by: (your name)
 */
export class TransformPileOfBonesBehaviour implements Behaviour {
    /**
     * Number of rounds survived
     */
    private roundsSurvived: number = 0;

    /**
     * Actor which should be respawned
     */
    private toRespawn: Actor;

    /**
     * Constructor for the transform behaviour
     * @param toRespawn actor which will be brought back
     */
    constructor(toRespawn: Actor) {
        this.toRespawn = toRespawn;
    }

    /**
     * Allows the behaviour to get the action to despawn the actor
     * @param actor the actor that despawns
     * @param map the GameMap containing the Actor
     * @return the transform action for the actor, or null if not ready
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        this.roundsSurvived += 1;
        if (this.roundsSurvived > 2) {
            const revivalAction = new TransformAction(this.toRespawn, map.locationOf(actor));
            map.removeActor(actor);
            return revivalAction;
        }
        return null;
    }
}