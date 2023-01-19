import { test } from 'node:test';
import * as assert from 'node:assert';
import todosReducer from './todosSlice.js';

test('Add a new todo', () => {
    const action = { type: 'todos/todoAdded', payload: 'Test text' };

    const result = todosReducer([], action);
    assert.strictEqual('Test text', result[0].text);
})

test('Toggle a todo based on id', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: false }]

    const action = { type: 'todos/todoToggled', payload: 0 }
    const result = todosReducer(initialState, action)
    assert.strictEqual(true, result[0].completed);
});