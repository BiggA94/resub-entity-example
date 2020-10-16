import React, {Suspense} from 'react';
import './App.css';
import {withResubAutoSubscriptions} from 'resub';
import {createSuspenseStore_experimental} from 'resub-entity';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

interface TestObject {
    id: number;
    name: string;
    count: number;
}

const testValues = new Map<number, TestObject>([
    [1, {id: 1, name: 'one', count: 0}],
    [2, {id: 2, name: 'two', count: 0}],
    [3, {id: 3, name: 'three', count: 0}],
    [4, {id: 4, name: 'four', count: 0}],
    [5, {id: 5, name: 'five', count: 0}],
]);

function loadFunction(id: number): Observable<TestObject> {
    const result: Observable<TestObject> = of((testValues.get(id) || {
        id: 0,
        name: 'undefined',
        count: 0
    } as TestObject))
        .pipe(
            delay(Math.random() * 5000)
        );

    return result;
}

let testStore = createSuspenseStore_experimental<TestObject>({
    selectIdFunction: (entity: Readonly<TestObject>) => entity.id,
    loadFunction,
});

function increment(id: number) {
    let element = testStore.getOne(id).read();
    if (element) {
        element.count += 1;
        testStore.setOne(element);
    }
}

const Counter = withResubAutoSubscriptions(function counter(props: { id: number }) {
    const id = props.id;
    const counter = testStore.getOne(id).read();

    return (
        <div>
            <button onClick={() => increment(id)}>{counter?.name}: {counter?.count}</button>
        </div>
    )
})

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {[1, 2, 3, 4, 5].map(value => {
                    return (
                        <Suspense fallback={(<h3>loading counter {value}</h3>)} key={value}>
                            <Counter id={value} key={value}/>
                        </Suspense>
                    )
                })}
            </header>
        </div>
    );
}

export default withResubAutoSubscriptions(App);

