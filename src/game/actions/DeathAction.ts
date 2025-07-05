import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Item } from './../../engine/items/Item.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { WeaponItem } from './../../engine/weapons/WeaponItem.js';
import { SiteOfLostGrace } from '../grounds/SiteOfLostGrace.js';
import { ResetManager } from '../reset/ResetManager.js';
import { RuneManager } from '../runes/RuneManager.js';
import { FancyMessage } from '../utility/FancyMessage.js';
import { Status } from '../utility/Status.js';

/**
 * An action executed if an actor is killed.
 * Created by: Adrian Kristanto
 * Modified by: Rvinder Sandhu & Caleb Smith
 */
export class DeathAction extends Action {
    /**
     * Person killing actor which is dying
     */
    private attacker: Actor;

    /**
     * Constructor for new death action
     * @param actor the attacker
     */
    constructor(actor: Actor) {
        super();
        this.attacker = actor;
    }

    /**
     * When the target is killed, the items & weapons carried by target
     * will be dropped to the location in the game map where the target was
     * @param target The actor being killed.
     * @param map The map the actor is on.
     * @returns result of the action to be displayed on the UI
     */
    execute(target: Actor, map: GameMap): string {
        let result = "";
        const dropActions = new ActionList();

        if (target.hasCapability(Status.DEMIGOD)) {
            FancyMessage.fancyPrint(FancyMessage.DEMIGOD_FELLED);
            map.locationOf(target).setGround(new SiteOfLostGrace(target.toString()));
        }
        if (this.attacker.hasCapability(Status.RUNE_ABSORBER)) {
            result += "\n" + target + " dropped " + RuneManager.getInstance().getReleasedRunes() + " runes.";
        }

        // drop all items
        for (const item of target.getItemInventory()) {
            const dropAction = item.getDropAction(target);
            if (dropAction) {
                dropActions.add(dropAction);
            }
        }
        for (const weapon of target.getWeaponInventory()) {
            const dropAction = weapon.getDropAction(target);
            if (dropAction) {
                dropActions.add(dropAction);
            }
        }
        for (const drop of dropActions.getUnmodifiableActionList()) {
            drop.execute(target, map);
        }

        // remove actor
        map.removeActor(target);
        result += "\n" + this.menuDescription(target);

        // Deregister actor from managers
        if (typeof (target as any).ReleaseRunes === "function") {
            RuneManager.getInstance().removeRuneCarrier(target as unknown as import("../runes/RuneCarrier").RuneCarrier);
        }
        ResetManager.getInstance().removeResettable(target);

        return result;
    }

    /**
     * Describes which actor is being killed
     * @param actor The actor being killed
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} is killed.`;
    }
}