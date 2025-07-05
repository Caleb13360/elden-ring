import { Action } from './../../../engine/actions/Action.js';
import { ActionList } from './../../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../../engine/actions/DoNothingAction.js';
import { Actor } from './../../../engine/actors/Actor.js';
import { Display } from './../../../engine/displays/Display.js';
import { GameMap } from './../../../engine/positions/GameMap.js';
import { IntrinsicWeapon } from './../../../engine/weapons/IntrinsicWeapon.js';
import { WeaponItem } from './../../../engine/weapons/WeaponItem.js';
import { AttackAction } from '../../actions/AttackAction.js';
import { Behaviour } from '../../behaviours/Behaviour.js';
import { AttackBehaviour } from '../../behaviours/AttackBehaviour.js';
import { FollowBehaviour } from '../../behaviours/FollowBehaviour.js';
import { WanderBehaviour } from '../../behaviours/WanderBehaviour.js';
import { RuneCarrier } from '../../runes/RuneCarrier.js';
import { RuneManager } from '../../runes/RuneManager.js';
import { RandomNumberGenerator } from '../../utility/RandomNumberGenerator.js';
import { Status } from '../../utility/Status.js';

/**
 * Abstract class for enemy NPCs
 * Created by: Rvinder Sandhu
 * References code from original Lone Wolf module
 */
export abstract class RegularEnemy extends Actor implements RuneCarrier {
    /**
     * Map of ordered behaviours of the enemy
     */
    protected behaviours: Map<number, Behaviour> = new Map();

    /**
     * Minimum number of runes dropped on death
     */
    private minRunes: number = 0;

    /**
     * Maximum number of runes dropped on death
     */
    private maxRunes: number = 0;

    /**
     * Intrinsic attack damage
     */
    private intrinsicWeaponDamage: number = 5;

    /**
     * Intrinsic attack verb
     */
    private intrinsicAttackVerb: string = "punch";

    /**
     * Intrinsic attack accuracy
     */
    private intrinsicWeaponAccuracy: number = 50;

    /**
     * Constructor for a regular enemy that utilises a specific intrinsic weapon
     */
    constructor(
        name: string,
        displayChar: string,
        hitPoints: number,
        minRunes: number,
        maxRunes: number,
        intrinsicWeaponDamage?: number,
        intrinsicAttackVerb?: string,
        intrinsicWeaponAccuracy?: number
    ) {
        super(name, displayChar, hitPoints);
        this.minRunes = minRunes;
        this.maxRunes = maxRunes;
        RuneManager.getInstance().registerRuneCarrier(this);
        if (intrinsicWeaponDamage !== undefined) this.intrinsicWeaponDamage = intrinsicWeaponDamage;
        if (intrinsicAttackVerb !== undefined) this.intrinsicAttackVerb = intrinsicAttackVerb;
        if (intrinsicWeaponAccuracy !== undefined) this.intrinsicWeaponAccuracy = intrinsicWeaponAccuracy;
        this.behaviours.set(999, new WanderBehaviour());
        this.behaviours.set(100, new AttackBehaviour());
    }

    /**
     * Getter for minimum number of runes that can be dropped
     */
    getMinRunes(): number {
        return this.minRunes;
    }

    /**
     * Getter for maximum number of runes that can be dropped
     */
    getMaxRunes(): number {
        return this.maxRunes;
    }

    /**
     * At each turn, select a valid action to perform.
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        for (const behaviour of this.behaviours.values()) {
            const action = behaviour.getAction(this, map);
            if (action !== null) {
                return action;
            }
        }
        return new DoNothingAction();
    }

    /**
     * Regular enemies may be attacked by any actor that has the HOSTILE_TO_ENEMY capability
     * This method also begins the following of a hostile actor
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        const actions = new ActionList();
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
     * Gets the intrinsic weapon of the enemy
     */
    getIntrinsicWeapon(): IntrinsicWeapon {
        return new IntrinsicWeapon(this.intrinsicWeaponDamage, this.intrinsicAttackVerb, this.intrinsicWeaponAccuracy);
    }

    /**
     * Method which will return number of runes that are to be released upon invocation
     * only released if the enemy has died within the player turn it is called within
     */
    ReleaseRunes(): number {
        if (!this.isConscious()) {
            return RandomNumberGenerator.getRandomInt(this.minRunes, this.maxRunes);
        } else {
            return 0;
        }
    }
}