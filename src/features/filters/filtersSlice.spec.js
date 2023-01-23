import { test } from 'node:test';
import * as assert from 'node:assert';
import filtersReducer from './filtersSlice.js';
import { StatusFilters } from './filtersSlice.js';

test('Status filter change', () => {
    const initialState = {
        status: 'all',
        colors: []
    };

    const statusList = Object.values(StatusFilters);

    const result = statusList.map(status => filtersReducer(initialState, { type: 'filters/statusFilterChanged', payload: status }));

    assert.deepEqual(statusList, result.map(r => r.status));
})