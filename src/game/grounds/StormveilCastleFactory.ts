import { SpawnFactory } from './SpawnFactory.js';
import { Canine } from '../actors/enemies/Canine.js';
import { Crustacean } from '../actors/enemies/Crustacean.js';
import { Skeleton } from '../actors/enemies/Skeleton.js';
import { Humanoid } from '../actors/enemies/Humanoid.js';
import { Dog } from '../actors/enemies/Dog.js';
import { GodrickSoldier } from '../actors/enemies/GodrickSoldier.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';

/**
 * Concrete factory for spawning enemies in Stormveil Castle
 * Created by: (your name here)
 */
export class StormveilCastleFactory implements SpawnFactory {
    createCanine(): Canine | null {
        if (RandomNumberGenerator.getRandomInt(100) < 37) {
            return new Dog();
        }
        return null;
    }

    createHumanoid(): Humanoid | null {
        if (RandomNumberGenerator.getRandomInt(100) < 45) {
            return new GodrickSoldier();
        }
        return null;
    }

    createCrustacean(): Crustacean | null {
        // Not implemented for Stormveil Castle
        return null;
    }

    createSkeleton(): Skeleton | null {
        // Not implemented for Stormveil Castle
        return null;
    }
}