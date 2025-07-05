import { Action } from './../../engine/actions/Action.js';
import { Actor } from './../../engine/actors/Actor.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { ResetManager } from '../reset/ResetManager.js';

/**
 * Reset action which can reset the world when run
 * Created by: Rvinder Sandhu
 */
export class ResetAction extends Action {
    /**
     * Initiate the reset of the world
     * @param actor actor resetting the game
     * @param map the map the actor is in
     * @return a string telling the user the world is rewinding
     */
    execute(actor: Actor, map: GameMap): string {
        ResetManager.getInstance().run();
        return "The world has rewound";
    }

    /**
     * Describes which action to reset the world
     * @param actor The actor performing the reset
     * @return a description used for the menu UI
     */
    menuDescription(actor: Actor): string {
        return "Reset the world";
    }
}