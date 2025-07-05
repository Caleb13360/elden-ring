import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';

/**
 * Base class for Actions. These represent things that the actor can do.
 */
export abstract class Action {
    /**
     * Perform the Action.
     *
     * @param actor The actor performing the action.
     * @param map The map the actor is on.
     * @return a description of what happened that can be displayed to the user.
     */
    abstract execute(actor: Actor, map: GameMap): string;

    /**
     * Returns a descriptive string
     * @param actor The actor performing the action.
     * @return the text we put on the menu
     */
    abstract menuDescription(actor: Actor): string;

    /**
     * Returns the key used in the menu to trigger this Action.
     * There's no central management system for this, so you need to be careful not to use the same one twice.
     * See https://en.wikipedia.org/wiki/Connascence
     *
     * @return The key we use for this Action in the menu, or null to have it assigned for you.
     */
    hotkey(): string | null {
        return null;
    }

    /**
     * This provides a mechanism for Actions to take more than one turn.
     * For example, an action can change its state and return itself, or return the next Action in a series.
     * By default, this returns null, indicating that the Action will complete in one turn.
     * 
     * @return the subsequent action in the series for multi-turn action or null if there is no next action available
     */
    getNextAction(): Action | null {
        return null;
    }
}