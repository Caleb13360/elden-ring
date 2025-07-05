import { Action } from './../../../engine/actions/Action.js';
import { ActionList } from './../../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../../engine/actions/DoNothingAction.js';
import { MoveActorAction } from './../../../engine/actions/MoveActorAction.js';
import { Display } from './../../../engine/displays/Display.js';
import { GameMap } from './../../../engine/positions/GameMap.js';
import { Behaviour } from '../../behaviours/Behaviour.js';
import { Remembrance } from '../../items/Remembrance.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { Status } from '../../utility/Status.js';
import { AxeOfGodrick } from '../../weapons/AxeOfGodrick.js';
import { GraftedDragon } from '../../weapons/GraftedDragon.js';
import { RegularEnemy } from './RegularEnemy.js';

/**
 * Class representing Godrick The Grafted Enemy
 * Created by: Caleb Smith
 */
export class GodrickTheGrafted extends RegularEnemy implements Resettable {
    private axeOfGodrick = new AxeOfGodrick();
    private graftedDragon = new GraftedDragon();
    private secondPhase: boolean = false;
    private toReset: boolean = false;
    private x: number;
    private y: number;

    /**
     * Godrick the Grafted constructor
     * @param x x coordinate of respawn
     * @param y y coordinate of respawn
     */
    constructor(x: number, y: number) {
        super("Godrick The Grafted", 'Y', 6080, 20000, 20000);
        this.x = x;
        this.y = y;
        this.axeOfGodrick.togglePortability();
        this.graftedDragon.togglePortability();
        this.addWeaponToInventory(this.axeOfGodrick);

        const graftedRemembrance = new Remembrance("Remembrance of the Grafted", 20000);
        graftedRemembrance.addTradeable(new AxeOfGodrick());
        graftedRemembrance.addTradeable(new GraftedDragon());
        this.addItemToInventory(graftedRemembrance);

        this.addCapability(Status.DEMIGOD);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * At each turn, select a valid action to perform.
     * Reset enemy if required, go into second phase if required
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        if (this.toReset) {
            this.toReset = false;
            if (map.at(this.x, this.y).containsAnActor()) {
                return new MoveActorAction(map.at(this.x, this.y), "to starting position");
            } else {
                return new DoNothingAction();
            }
        }
        if (!this.secondPhase && (this.hitPoints <= (this.maxHitPoints / 2))) {
            this.removeWeaponFromInventory(this.axeOfGodrick);
            this.addWeaponToInventory(this.graftedDragon);
            this.secondPhase = true;
        }
        for (const behaviour of this.behaviours.values()) {
            const action = behaviour.getAction(this, map);
            if (action !== null) {
                return action;
            }
        }
        return new DoNothingAction();
    }

    /**
     * Sets the enemy to reset on its next turn, switches to first phase if boss is in second
     */
    reset(): void {
        this.toReset = true;
        this.heal(this.maxHitPoints - this.hitPoints);
        if (this.secondPhase) {
            this.addWeaponToInventory(this.axeOfGodrick);
            this.removeWeaponFromInventory(this.graftedDragon);
            this.secondPhase = false;
        }
        this.behaviours.delete(997);
    }
}