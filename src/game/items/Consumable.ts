import { Actor } from './../../engine/actors/Actor.js';

/**
 * Interface for a consumable item that allows it to be consumed
 * Created by:
 * Caleb Smith
 */
export interface Consumable {
    /**
     * Consumes the item
     * @param actor actor consuming the item
     * @return description of the consumption
     */
    consume(actor: Actor): string;
}