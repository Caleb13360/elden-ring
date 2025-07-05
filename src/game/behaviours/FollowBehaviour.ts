import { Actor } from './../../engine/actors/Actor.js';
import { Action } from './../../engine/actions/Action.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { MoveActorAction } from './../../engine/actions/MoveActorAction.js';
import { Behaviour } from './Behaviour.js';

/**
 * A class that figures out a MoveAction that will move the actor one step 
 * closer to a target Actor.
 * Created by: Riordan D. Alfredo
 */
export class FollowBehaviour implements Behaviour {
    /**
     * The target to follow
     */
    private target: Actor;

    /**
     * Constructor.
     * @param subject the Actor to follow
     */
    constructor(subject: Actor) {
        this.target = subject;
    }

    /**
     * Gets the relevant move action if the follow behaviour can be carried out
     * @param actor the Actor trying to follow the target
     * @param map the GameMap containing the Actor
     * @return the resultant action for the follow behaviour
     */
    getAction(actor: Actor, map: GameMap): Action | null {
        if (!map.contains(this.target) || !map.contains(actor)) {
            return null;
        }

        const here = map.locationOf(actor);
        const there = map.locationOf(this.target);

        const currentDistance = this.distance(here, there);
        for (const exit of here.getExits()) {
            const destination = exit.getDestination();
            if (destination.canActorEnter(actor)) {
                const newDistance = this.distance(destination, there);
                if (newDistance < currentDistance) {
                    return new MoveActorAction(destination, exit.getName());
                }
            }
        }

        return null;
    }

    /**
     * Compute the Manhattan distance between two locations.
     * @param a the first location
     * @param b the second location
     * @return the number of steps between a and b if you only move in the four cardinal directions.
     */
    private distance(a: Location, b: Location): number {
        return Math.abs(a.xCoord() - b.xCoord()) + Math.abs(a.yCoord() - b.yCoord());
    }
}