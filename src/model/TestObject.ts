export interface TestObject {
    id: number;
    name: string;
    count: number;
}

export const testValues = new Map<number, TestObject>([
    [1, { id: 1, name: 'one', count: 0 }],
    [2, { id: 2, name: 'two', count: 0 }],
    [3, { id: 3, name: 'three', count: 0 }],
    [4, { id: 4, name: 'four', count: 0 }],
    [5, { id: 5, name: 'five', count: 0 }],
]);