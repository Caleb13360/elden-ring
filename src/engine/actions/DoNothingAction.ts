import { Action } from './Action.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';

/**
 * An Action that doesn't do anything.
 * Use this to implement waiting or similar actions in game clients.
 */
export class DoNothingAction extends Action {

  /**
   * Constructor
   */
  constructor() {
    super();
  }

  /**
   * When this action is executed, it will return "actor does nothing"
   * 
   * @param actor The actor performing the action.
   * @param map The map the actor is on.
   * @returns the string describing that the current actor does nothing
   */
  execute(actor: Actor, map: GameMap): string {
    return this.menuDescription(actor);
  }

  /**
   * In the actions menu, the description for this action will be "actor does nothing"
   * 
   * @param actor The actor performing the action.
   * @returns the string "actor does nothing" to be shown in the menu
   */
  menuDescription(actor: Actor): string {
    return `${actor} does nothing`;
  }

  /**
   * By default, we assign "5" as a hotkey for the do nothing action
   * 
   * @returns the string "5"
   */
  hotkey(): string {
    return "5";
  }
}