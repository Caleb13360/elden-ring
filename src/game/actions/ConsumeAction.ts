import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Consumable } from '../items/Consumable.js';

/**
 * An Action to consume an item
 * Created by: Caleb Smith
 */
export class ConsumeAction extends Action {
    /**
     * Consumable item to be consumed
     */
    private consumable: Consumable;

    /**
     * Consume action constructor
     * @param consumable consumable item to be consumed
     */
    constructor(consumable: Consumable) {
        super();
        this.consumable = consumable;
    }

    /**
     * Complete the consume action
     * @param actor The actor consuming the item
     * @param map The map the actor is on.
     * @returns description of the consumption
     */
    execute(actor: Actor, map: GameMap): string {
        return this.consumable.consume(actor);
    }

    /**
     * Describes which actor is consuming the item
     * @param actor The actor consuming the item
     * @returns a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return `${actor} consumes ${this.consumable}`;
    }
}