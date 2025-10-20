import { describe, it, expect } from 'vitest';
import { getPersonality } from '../js/personalities.js';

describe('getPersonality', () => {
    it('returns the correct personality object for a valid key', () => {
        const result = getPersonality('salty');

        expect(result).toBeDefined();
        expect(result.key).toBe('salty');
        expect(result.displayName).toBe('The Veteran');
    });

    it('returns undefined for an invalid key', () => {
        const result = getPersonality('nonexistent');
        expect(result).toBeUndefined();
    });
});
