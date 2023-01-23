import { test } from 'node:test';
import * as assert from 'node:assert';
import filtersReducer from './filtersSlice.js';
import { StatusFilters } from './filtersSlice.js';

Object.values(StatusFilters).forEach(status => {
    test(`Status filter change to '${status}'`, () => {
        const initialState = {
            status: 'StatusFilters.All',
            colors: []
        };

        const result = filtersReducer(initialState, { type: 'filters/statusFilterChanged', payload: status });

        assert.deepStrictEqual(status, result.status);
    })
})
