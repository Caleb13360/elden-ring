import { Action } from './../../../engine/actions/Action.js';
import { ActionList } from './../../../engine/actions/ActionList.js';
import { DoNothingAction } from './../../../engine/actions/DoNothingAction.js';
import { Actor } from './../../../engine/actors/Actor.js';
import { Display } from './../../../engine/displays/Display.js';
import { GameMap } from './../../../engine/positions/GameMap.js';
import { WeaponItem } from './../../../engine/weapons/WeaponItem.js';
import { AttackAction } from '../../actions/AttackAction.js';
import { DespawnAction } from '../../actions/DespawnAction.js';
import { TransformAction } from '../../actions/TransformAction.js';
import { Behaviour } from '../../behaviours/Behaviour.js';
import { TransformPileOfBonesBehaviour } from '../../behaviours/TransformPileOfBonesBehaviour.js';
import { ResetManager } from '../../reset/ResetManager.js';
import { Resettable } from '../../reset/Resettable.js';
import { RuneCarrier } from '../../runes/RuneCarrier.js';
import { RuneManager } from '../../runes/RuneManager.js';
import { RandomNumberGenerator } from '../../utility/RandomNumberGenerator.js';
import { Status } from '../../utility/Status.js';
import { Faction } from './Faction.js';
import { PileOfBonesSkill } from './PileOfBonesSkill.js';

/**
 * Class representing the Pile Of Bones that an enemy becomes upon activating the Pile Of Bones kill on death
 * Created by: Rvinder Sandhu
 */
export class PileOfBones extends Actor implements Resettable, RuneCarrier {
    private minRunes: number = 0;
    private maxRunes: number = 0;
    private toReset: boolean = false;
    protected behaviours: Map<number, Behaviour> = new Map();

    /**
     * Constructor for Pile Of Bones
     * @param originator The user of the Pile of Bones Skill
     * @param minRunes minimum amount of runes dropped
     * @param maxRunes maximum amount of runes dropped
     */
    constructor(originator: PileOfBonesSkill, minRunes: number, maxRunes: number) {
        super("Pile of Bones", 'X', 1);
        this.minRunes = minRunes;
        this.maxRunes = maxRunes;
        ResetManager.getInstance().registerResettable(this);
        RuneManager.getInstance().registerRuneCarrier(this);
        this.behaviours.set(0, new TransformPileOfBonesBehaviour(originator.revive()));
        this.addCapability(Faction.SKELETON_FRIENDLY);
    }

    /**
     * Gets the allowable actions for this actor
     * @param otherActor the other actor wanting the allowable actions
     * @param direction  String representing the direction of the other Actor
     * @param map        current GameMap the other actor is on
     * @return list of actions that the actor can perform on the pile of bones
     */
    allowableActions(otherActor: Actor, direction: string, map: GameMap): ActionList {
        const actions = new ActionList();
        if (otherActor.hasCapability(Status.HOSTILE_TO_ENEMY)) {
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
     * Takes a turn within the game
     * Pile of Bones' turns only involve reviving what it once was after a certain number of rounds
     */
    async playTurn(actions: ActionList, lastAction: Action, map: GameMap, display: Display): Promise<Action> {
        if (this.toReset) {
            return new DespawnAction();
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
     * Lets the enemy know it needs to be reset on its next turn
     */
    reset(): void {
        this.toReset = true;
    }

    /**
     * Drops the runes when called if the enemy died in the player's turn
     * @return amount of runes dropped (0 if still alive)
     */
    ReleaseRunes(): number {
        if (!this.isConscious()) {
            return RandomNumberGenerator.getRandomInt(this.minRunes, this.maxRunes);
        } else {
            return 0;
        }
    }
}