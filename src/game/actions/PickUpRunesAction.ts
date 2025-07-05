import { Actor } from './../../engine/actors/Actor.js';
import { PickUpAction } from './../../engine/items/PickUpAction.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { RuneManager } from '../runes/RuneManager.js';
import { Runes } from '../runes/Runes.js';

/**
 * An action that allows the player to pick up the runes they dropped when they last died
 * Created by: Caleb Smith
 */
export class PickUpRunesAction extends PickUpAction {
    /**
     * Runes to be picked up
     */
    private runes: Runes;

    /**
     * Pick up runes action constructor
     * @param runes the runes to be picked up
     */
    constructor(runes: Runes) {
        super(runes);
        this.runes = runes;
    }

    /**
     * Completing the rune pickup:
     * Adds to the player's runes and removes itself from the last dropped rune locations
     * @param actor The actor picking up the runes
     * @param map The map the actor is on
     * @returns a string description of the runes being picked up
     */
    execute(actor: Actor, map: GameMap): string {
        const runeManager = RuneManager.getInstance();
        runeManager.addRunes(this.runes.getRunes());
        runeManager.setLastDroppedRune(null);
        runeManager.setLastDroppedRuneLocation(null);
        return super.execute(actor, map);
    }
}