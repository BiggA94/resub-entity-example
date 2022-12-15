import { createPersistentEntityStore, createSuspenseStore_experimental } from "resub-entity";
import { Observable, of, delay } from "rxjs";
import { TestObject, testValues } from "../model/TestObject";

function loadFunction(id: number): Observable<TestObject> {
    const testValue = testValues.get(id);
    // we need to return copies, so that we can reset
    const result: Observable<TestObject> = of((testValue ? { ...testValue } : {
        id: 0,
        name: 'undefined',
        count: 0
    } as TestObject))
        .pipe(
            delay(Math.random() * 5000)
        );

    return result;
}

export const testStore = createSuspenseStore_experimental<TestObject>({
    selectIdFunction: (entity: Readonly<TestObject>) => entity.id,
    loadFunction,
});

export const persistentStore = createPersistentEntityStore<TestObject>({
    selectIdFunction: (entity: Readonly<TestObject>) => entity.id,
    loadOnInit: true,
    storageKey: 'persistentStoreExample',
});

export function reinitialize() {
    // initialize persistent store
    testValues.forEach((testObject) => {
        if (!persistentStore.hasOne(testObject.id)) {
            persistentStore.setOne({...testObject});
            persistentStore.persist();
        }
    });
}