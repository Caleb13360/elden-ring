import { Actor } from './../../../engine/actors/Actor.js';
import { Item } from './../../../engine/items/Item.js';
import { WeaponItem } from './../../../engine/weapons/WeaponItem.js';
import { PileOfBones } from './PileOfBones.js';

/**
 * An interface for enemies who can turn into a pile of bones instead of instantly dying
 * Created by: Rvinder Sandhu
 */
export interface PileOfBonesSkill {
    /**
     * Skill which generates a pile of bones copying the originator's being and inventory
     * @param actor turning into a pile of bones
     * @param minRunes minimum runes the enemy can drop
     * @param maxRunes maximum runes the enemy can drop
     * @return a new pile of bones instance the enemy turned into
     */
    newBones(actor: Actor, minRunes: number, maxRunes: number): PileOfBones;

    /**
     * Revival of original actor invoking the skill
     * @return revived Actor
     */
    revive(): Actor;
}

/**
 * Default implementation for newBones, to be used in classes implementing PileOfBonesSkill.
 */
export function defaultNewBones(self: PileOfBonesSkill, actor: Actor, minRunes: number, maxRunes: number): PileOfBones {
    const newBones = new PileOfBones(self, minRunes, maxRunes);
    for (const item of actor.getItemInventory()) {
        newBones.addItemToInventory(item);
    }
    for (const weapon of actor.getWeaponInventory()) {
        newBones.addWeaponToInventory(weapon);
    }
    return newBones;
}