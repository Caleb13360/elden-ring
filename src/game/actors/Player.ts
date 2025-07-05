import { Action } from './../../engine/actions/Action.js';
import { ActionList } from './../../engine/actions/ActionList.js';
import { Actor } from './../../engine/actors/Actor.js';
import { Display } from './../../engine/displays/Display.js';
import { GameMap } from './../../engine/positions/GameMap.js';
import { Location } from './../../engine/positions/Location.js';
import { Menu } from './../../engine/displays/Menu.js';
import { ResetAction } from '../actions/ResetAction.js';
import { Faction } from './enemies/Faction.js';
import { FlaskOfCrimsonTears } from '../items/FlaskOfCrimsonTears.js';
import { PlayerClass } from '../playerclass/PlayerClass.js';
import { ResetManager } from '../reset/ResetManager.js';
import { Resettable } from '../reset/Resettable.js';
import { RuneManager } from '../runes/RuneManager.js';
import { Runes } from '../runes/Runes.js';
import { FancyMessage } from '../utility/FancyMessage.js';
import { Status } from '../utility/Status.js';

/**
 * Class representing the Player. It implements the Resettable interface.
 * It carries around a club to attack a hostile creature in the Lands Between.
 * Created by: Adrian Kristanto
 * Modified by: Caleb Smith & Rvinder Sandhu
 */
export class Player extends Actor implements Resettable {
    /**
     * The menu the player options uses
     */
    private readonly menu = new Menu();
    /**
     * The player class of the player
     */
    private readonly playerClass: PlayerClass;
    /**
     * Location of the player in the previous turn
     */
    private lastLocation!: Location;

    /**
     * Player constructor.
     * @param name Name to call the player in the UI
     * @param displayChar Character to represent the player in the UI
     * @param playerClass Player's starting class
     */
    constructor(name: string, displayChar: string, playerClass: PlayerClass) {
        super(name, displayChar, playerClass.getStartingHP());
        ResetManager.getInstance().registerResettable(this);
        this.addCapability(Status.HOSTILE_TO_ENEMY);
        this.addCapability(Faction.PLAYER_FRIENDLY);
        this.addCapability(Status.RUNE_ABSORBER);
        this.addWeaponToInventory(playerClass.getStartingWeapon());
        this.playerClass = playerClass;
        this.addItemToInventory(new FlaskOfCrimsonTears());
    }

    /**
     * Plays out the player's turn by getting all the actions that player can take and presenting them to the user
     * @param actions collection of possible Actions for the player this turn
     * @param lastAction The Action this Actor took last turn
     * @param map the map containing the player
     * @param display the I/O object to which actions will be shown from
     * @return the action the player chooses
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        // Handle multi-turn Actions
        if (this.hitPoints <= 0) {
            FancyMessage.fancyPrint(FancyMessage.YOU_DIED);
            this.temporaryDeath(map, display);
            return new ResetAction();
        }
        display.renderRunes(RuneManager.getInstance().getRunes())
        display.renderHealthBar(this.hitPoints, this.maxHitPoints);
        display.println(`${this} (${this.hitPoints}/${this.maxHitPoints}), runes: ${RuneManager.getInstance().getRunes()}`);
        const nextAction = lastAction.getNextAction();
        if (nextAction !== null)
            return nextAction;
        this.lastLocation = map.locationOf(this);
        return await this.menu.showMenu(this, actions, display);
    }

    /**
     * Used to see if the player is conscious (has any health left)
     * @return bool value for if the player is conscious
     */
    isConscious(): boolean {
        return true;
    }

    /**
     * Play out the 'death' of the player and make them drop their runes on the floor, remove the old runes
     * @param map the player 'died' on
     * @param display display used to print the dropped runes
     */
    private temporaryDeath(map: GameMap, display: Display): void {
        // Remove the old set of runes if they are on the floor
        const runeManager = RuneManager.getInstance();
        const resetManager = ResetManager.getInstance();
        runeManager.removeOldRunes();
        // Put the Runes down at the location one turn ago
        const runes = new Runes(RuneManager.getInstance().getRunes());
        runeManager.resetRunes();
        this.lastLocation.addItem(runes);
        display.println(`${this} dropped ${runes.getRunes()} runes`);
        // Set the markers for the last dropped location of the runes
        runeManager.setLastDroppedRune(runes);
        runeManager.setLastDroppedRuneLocation(this.lastLocation);
        const graceLocation = resetManager.getLastPlayerGrace();
        if (graceLocation) {
            map.moveActor(this, graceLocation);
        } else {
            throw new Error("No grace location found for player reset.");
        }
    }

    /**
     * Used to reset the player back to their starting hp
     */
    reset(): void {
        this.heal(this.getMaxHp() - this.hitPoints);
    }
}