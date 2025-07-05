import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { RuneManager } from '../runes/RuneManager.js';
import { UpgradeManager } from '../utility/UpgradeManager.js';

/**
 * An Action to upgrade player's HP through the site of lost grace
 * Created by: Caleb Smith
 */
export class UpgradeHpAction extends Action {
    /**
     * Amount to increase health by
     */
    private hpIncrease: number;
    /**
     * Amount of runes the upgrade costs
     */
    private cost: number;

    /**
     * HP upgrade action constructor
     * @param hpIncrease amount to increase health by
     * @param cost amount of runes the upgrade costs
     */
    constructor(hpIncrease: number, cost: number) {
        super();
        this.hpIncrease = hpIncrease;
        this.cost = cost;
    }

    /**
     * Try to complete the HP upgrade
     * @param actor The actor upgrading HP
     * @param map The map the actor is on
     * @returns description of the upgrade, failed or success
     */
    execute(actor: Actor, map: GameMap): string {
        if (RuneManager.getInstance().makePurchase(this.cost)) {
            UpgradeManager.getInstance().increaseCost();
            actor.increaseMaxHp(this.hpIncrease);
            return `${actor} upgrades their max hp by ${this.hpIncrease}`;
        }
        return "Max HP upgrade failed: insufficient runes";
    }

    /**
     * Describes which actor is upgrading the player's HP
     * @param actor The actor upgrading HP
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `Upgrade ${actor} max hit points by ${this.hpIncrease} for ${this.cost} runes`;
    }
}