import React, { Suspense } from 'react';
import './App.css';
import { withResubAutoSubscriptions } from 'resub';
import { Counter } from './components/Counter';
import { PersistentCounter } from './components/PersistentCounter';
import { reinitialize, persistentStore } from './stores';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                {[1, 2, 3, 4, 5].map(value => {
                    return (
                        <Suspense fallback={(<span>loading counter {value}</span>)} key={value}>
                            <Counter id={value} key={value} />
                        </Suspense>
                    )
                })}

                {[1, 2, 3, 4, 5].map(value => {
                    return (
                        <PersistentCounter id={value} key={value} />
                    )
                })}


                <div><button onClick={() => { persistentStore.clear(); persistentStore.persist() }}>clear persistent store</button></div>
            </header>
        </div>
    );
}

export default withResubAutoSubscriptions(App);

