import { Action } from './../../../engine/actions/Action.js';
import { ActionList } from './../../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../../engine/actions/DoNothingAction.js';
import { MoveActorAction } from './../../../engine/actions/MoveActorAction.js';
import { Actor } from './../../../engine/actors/Actor.js';
import { Display } from './../../../engine/displays/Display.js';
import { GameMap } from './../../../engine/positions/GameMap.js';
import { WeaponItem } from './../../../engine/weapons/WeaponItem.js';
import { AOEAttackAction } from '../../actions/AOEAttackAction.js';
import { AttackAction } from '../../actions/AttackAction.js';
import { RadahnJumpAction } from '../../actions/RadahnJumpAction.js';
import { Behaviour } from '../../behaviours/Behaviour.js';
import { FollowBehaviour } from '../../behaviours/FollowBehaviour.js';
import { GreatRune } from '../../items/GreatRune.js';
import { Remembrance } from '../../items/Remembrance.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { Status } from '../../utility/Status.js';
import { LionGreatbow } from '../../weapons/LionGreatbow.js';
import { RadahnMeteor } from '../../weapons/RadahnMeteor.js';
import { StarscourgeGreatswords } from '../../weapons/StarscourgeGreatswords.js';
import { RegularEnemy } from './RegularEnemy.js';

/**
 * Class representing Starscourge Radahn Enemy
 * Created by: Caleb Smith
 */
export class StarscourgeRadahn extends RegularEnemy implements Resettable {
    private starscourgeGreatswords = new StarscourgeGreatswords();
    private lionGreatbow = new LionGreatbow();
    private secondPhase = false;
    private waitTurns = 2;
    private toReset = false;
    private x: number;
    private y: number;
    protected behaviours: Map<number, Behaviour> = new Map();

    /**
     * Starscourge Radahn constructor
     * @param x x coordinate of respawn
     * @param y y coordinate of respawn
     */
    constructor(x: number, y: number) {
        super("Starscourge Radahn", 'R', 9572, 70000, 70000);
        this.x = x;
        this.y = y;
        this.starscourgeGreatswords.togglePortability();
        this.lionGreatbow.togglePortability();
        this.addWeaponToInventory(this.starscourgeGreatswords);

        const starscourgeRemembrance = new Remembrance("Remembrance of Starscourge", 40000);
        starscourgeRemembrance.addTradeable(new StarscourgeGreatswords());
        starscourgeRemembrance.addTradeable(new LionGreatbow());
        this.addItemToInventory(starscourgeRemembrance);
        this.addItemToInventory(new GreatRune("Radahn's Great Rune", 480));
        this.addCapability(Status.DEMIGOD);
        ResetManager.getInstance().registerResettable(this);
    }

    /**
     * Regular enemies may be attacked by any actor that has the HOSTILE_TO_ENEMY capability
     * This method also begins the following of a hostile actor
     * Waits if radahn has not landed yet
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        const actions = new ActionList();
        if (this.secondPhase && this.waitTurns > -1) {
            return actions;
        }
        if (otherActor.hasCapability(Status.HOSTILE_TO_ENEMY)) {
            this.behaviours.set(997, new FollowBehaviour(otherActor));
            actions.add(new AttackAction(this, direction));
            for (const weapon of otherActor.getWeaponInventory()) {
                actions.add(new AttackAction(this, direction, weapon));
                if (typeof (weapon as any).getSkill === "function") {
                    actions.add((weapon as any).getSkill(this, direction));
                }
            }
        }
        return actions;
    }

    /**
     * At each turn, select a valid action to perform.
     * Reset enemy if required, go into second phase if required, handles jumping up and landing as a meteor
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
            this.removeWeaponFromInventory(this.starscourgeGreatswords);
            this.addWeaponToInventory(this.lionGreatbow);
            this.secondPhase = true;
            this.setDisplayChar('.');
            return new RadahnJumpAction();
        }
        if (this.secondPhase && this.waitTurns > 0) {
            this.waitTurns -= 1;
            return new DoNothingAction();
        }
        if (this.waitTurns === 0) {
            this.waitTurns -= 1;
            this.setDisplayChar('R');
            display.println(this + " crashes back down in a fiery meteor-like ball!");
            return new AOEAttackAction(new RadahnMeteor());
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
        this.waitTurns = 2;
        this.heal(this.maxHitPoints - this.hitPoints);
        if (this.secondPhase) {
            this.addWeaponToInventory(this.starscourgeGreatswords);
            this.removeWeaponFromInventory(this.lionGreatbow);
            this.secondPhase = false;
        }
        this.behaviours.delete(997);
    }
}