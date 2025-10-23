import { describe, it, expect, vi } from 'vitest';
import * as personalities from '../js/personalities.js';
import {changePersonality, getCurrentPersonality, resetPersonality } from '../js/process-msg.js';

describe('changePersonality', () => {
    it('updates currentPersonality using getPersonality()', () => {
        // Mock getPersonality to control what it returns
        const mockPersonality = { key: 'test', displayName: 'Test Personality' };
        const spy = vi.spyOn(personalities, 'getPersonality').mockReturnValue(mockPersonality);

        changePersonality('test');

        expect(spy).toHaveBeenCalledWith('test');
        expect(getCurrentPersonality()).toEqual(mockPersonality);

        spy.mockRestore();

        resetPersonality();
    });
});
