import { test } from 'node:test';
import * as assert from 'node:assert';
import filtersReducer from './filtersSlice.js';


test('Status filter change', () => {
    const initialState = {
        status: 'All',
        colors: []
    };
    const status = 'Checked';
    const action = { type: 'filters/statusFilterChanged', payload: status };

    const result = filtersReducer(initialState, action);

    assert.strictEqual('Checked', result.status);
})