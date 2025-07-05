import { Actor } from './../../engine/actors/Actor.js';

/**
 * An interface that represents an item that can be traded for a remembrance.
 * Created by:
 * Caleb Smith, Rvinder Sandhu
 */
export interface Tradeable {
    /**
     * Add tradeable to actor inventory
     * @param traderInActor actor in which tradeable is being added to
     */
    addTradeableToInventory(traderInActor: Actor): void;
}