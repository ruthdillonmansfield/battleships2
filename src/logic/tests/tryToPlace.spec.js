import { expect } from 'chai';
import tryToPlace from '../tryToPlace.js';

describe.only('tryToPlace', () => {
    it('is a function', () => {
        expect(tryToPlace).to.be.a('function');
    });
});