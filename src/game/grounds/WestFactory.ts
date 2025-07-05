import { SpawnFactory } from './SpawnFactory.js';
import { Skeleton } from '../actors/enemies/Skeleton.js';
import { HeavySkeletalSwordsman } from '../actors/enemies/HeavySkeletalSwordsman.js';
import { Canine } from '../actors/enemies/Canine.js';
import { LoneWolf } from '../actors/enemies/LoneWolf.js';
import { Crustacean } from '../actors/enemies/Crustacean.js';
import { GiantCrab } from '../actors/enemies/GiantCrab.js';
import { Humanoid } from '../actors/enemies/Humanoid.js';
import { RandomNumberGenerator } from '../utility/RandomNumberGenerator.js';

/**
 * Concrete class for western enemy spawning fields in Limgrave
 * Author: Rvinder Sandhu
 */
export class WestFactory implements SpawnFactory {
    createSkeleton(): Skeleton | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 77) {
            return new HeavySkeletalSwordsman();
        } else {
            return null;
        }
    }

    createCanine(): Canine | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 77) {
            return new LoneWolf();
        } else {
            return null;
        }
    }

    createCrustacean(): Crustacean | null {
        if (RandomNumberGenerator.getRandomInt(0, 100) > 98) {
            return new GiantCrab();
        } else {
            return null;
        }
    }

    createHumanoid(): Humanoid | null {
        return null;
    }
}