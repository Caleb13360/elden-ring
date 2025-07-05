import { Action } from './Action.js';
import { Actor } from '../actors/Actor.js';
import { GameMap } from '../positions/GameMap.js';
import { Location } from '../positions/Location.js';

/**
 * An Action that moves the Actor.
 */
export class MoveActorAction extends Action {
    /**
     * Target location
     */
    protected moveToLocation: Location;
    /**
     * One of the 8-d navigation
     */
    protected direction: string;
    /**
     * Or the command key
     */
    protected hotKey: string | null;

    /**
     * Constructor to create an Action that will move the Actor to a Location in a given Direction, using
     * a given menu hotkey.
     */
    constructor(moveToLocation: Location, direction: string, hotKey?: string | null) {
        super();
        this.moveToLocation = moveToLocation;
        this.direction = direction;
        this.hotKey = hotKey ?? null;
    }

    /**
     * Allow the Actor to be moved.
     */
    execute(actor: Actor, map: GameMap): string {
        map.moveActor(actor, this.moveToLocation);
        return this.menuDescription(actor);
    }

    /**
     * Returns a description of this movement suitable to display in the menu.
     */
    menuDescription(actor: Actor): string {
        return `${actor} moves ${this.direction}`;
    }

    /**
     * Returns this Action's hotkey.
     */
    hotkey(): string | null {
        return this.hotKey;
    }
}