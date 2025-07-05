import { Action } from './../../engine/actions/Action.js';
import { MoveActorAction } from './../../engine/actions/MoveActorAction.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { Weapon } from './../../engine/weapons/Weapon.js';
import { AOEAttackAction } from './AOEAttackAction.js';

/**
 * An Action to perform the starcaller cry action which pulls nearby enemies in and aoe attacks them
 * Created by: Caleb Smith
 */
export class StarcallerCryAction extends Action {
    /**
     * Weapon using the skill
     */
    private weapon: Weapon;

    /**
     * Starcaller cry action constructor
     * @param weapon weapon using the skill
     */
    constructor(weapon: Weapon) {
        super();
        this.weapon = weapon;
    }

    /**
     * Complete the starcaller cry action by first attempting to pull nearby enemies inwards and then performing
     * an aoe attack on them all
     * @param actor The actor performing the skill
     * @param map The map the actor is on.
     * @return description of the execution of the skill
     */
    execute(actor: Actor, map: GameMap): string {
        if (!this.weapon) {
            this.weapon = actor.getIntrinsicWeapon();
        }
        let results = `${actor} uses starcaller cry to pull in all nearby enemies all around them `;
        const adjacentLocations: Location[] = [];
        const adjacentLocationsHashes: Set<number> = new Set();

        // Add all adjacent locations and their hash codes
        const actorLocation = map.locationOf(actor);
        adjacentLocations.push(actorLocation);
        adjacentLocationsHashes.add(actorLocation.hashCode());
        for (const exit of actorLocation.getExits()) {
            adjacentLocations.push(exit.getDestination());
            adjacentLocationsHashes.add(exit.getDestination().hashCode());
        }

        // Loop over every exit from each adjacent location
        for (const location of adjacentLocations) {
            for (const exit of location.getExits()) {
                const dest = exit.getDestination();
                // If exit is not adjacent to actor, exit contains an actor, and the tile to be moved to doesn't, move the actor in
                if (
                    !adjacentLocationsHashes.has(dest.hashCode()) &&
                    !location.containsAnActor() &&
                    dest.containsAnActor()
                ) {
                    results += "\n" + new MoveActorAction(location, `by the force of gravity towards ${actor}`).execute(dest.getActor(), map);
                }
            }
        }
        results += "\n" + new AOEAttackAction(this.weapon).execute(actor, map);
        return results;
    }

    /**
     * Describes which actor is performing the skill
     * @param actor The actor performing the skill
     * @return a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} uses starcaller cry`;
    }
}