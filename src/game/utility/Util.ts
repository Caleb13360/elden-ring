import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Exit } from './../../engine/positions/Exit.js';
import { Location } from './../../engine/positions/Location.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { AttackAction } from '../actions/AttackAction.js';
import { Faction } from '../actors/enemies/Faction.js';
import { Status } from '../utility/Status.js';

/**
 * Util class that contains helper methods that are frequently used throughout the code
 * Created by: Rvinder Sandhu
 */
export class Util {
    /**
     * Checks if two actors are part of the same allegiance or not
     * @param actor actor checking
     * @param target actor being checked against
     * @return boolean value if they are in the same allegiance
     */
    static checkCommonAllegiance(actor: Actor, target: Actor): boolean {
        if (target.hasCapability(Faction.NPC)) {
            return true;
        }
        const attackerFactions: Faction[] = actor.findCapabilitiesByType(Faction);
        const targetFactions: Faction[] = target.findCapabilitiesByType(Faction);
        for (const faction1 of attackerFactions) {
            for (const faction2 of targetFactions) {
                if (faction1 === faction2) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Gets a list of all nearby actors with a given status in adjacent tiles to the player
     * @param location current location of the player
     * @param status status to check for
     * @return a list of all actors in adjacent tiles with the given status
     */
    static getNearbyStatusActor(location: Location, status: Status): Actor[] {
        const actors: Actor[] = [];
        for (const exit of location.getExits()) {
            const dest = exit.getDestination();
            if (dest.containsAnActor()) {
                const actor = dest.getActor();
                if (actor && actor.hasCapability(status)) {
                    actors.push(actor);
                }
            }
        }
        return actors;
    }

    /**
     * Gets all ranged attacks within 2 tiles excluding current and adjacent tiles
     * @param currentLocation current location
     * @param weapon weapon used for ranged attack
     * @param actor actor performing attacks
     * @return list of possible ranged attacks
     */
    static getRangedAttacks(currentLocation: Location, weapon: WeaponItem, actor: Actor): Action[] {
        const range = 2;
        const actions: Action[] = [];
        for (let x = currentLocation.xCoord() - range; x <= currentLocation.xCoord() + range; x++) {
            if (currentLocation.mapRef().getXRange().contains(x)) {
                for (let y = currentLocation.yCoord() - range; y <= currentLocation.yCoord() + range; y++) {
                    if (currentLocation.mapRef().getYRange().contains(y)) {
                        // Exclude current and adjacent tiles
                        if (!((x >= currentLocation.xCoord() - 1 && x <= currentLocation.xCoord() + 1) &&
                              (y >= currentLocation.yCoord() - 1 && y <= currentLocation.yCoord() + 1))) {
                            const newLocation = currentLocation.mapRef().at(x, y);
                            if (newLocation.containsAnActor()) {
                                const targetActor = newLocation.getActor();
                                if (targetActor && !Util.checkCommonAllegiance(actor, targetActor)) {
                                    actions.push(new AttackAction(targetActor, `${x},${y}`, weapon));
                                }
                            }
                        }
                    }
                }
            }
        }
        return actions;
    }
}