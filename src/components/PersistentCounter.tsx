import { ComponentBase, withResubAutoSubscriptions } from "resub";
import { TestObject, testValues } from "../model/TestObject";
import { persistentStore } from "../stores";

function incrementPersistent(id: number) {
    const element = persistentStore.getOne(id) || testValues.get(id);
    if (element) {
        persistentStore.setOne({
            ...element,
            count: element.count + 1
        });
        persistentStore.persist();
    }
}

type PersistentCounterProps = {
    id: number;
}

type  PersistentCounterState = {
    counter?: TestObject;
}


export class PersistentCounter extends ComponentBase<PersistentCounterProps, PersistentCounterState> {

    _buildState(props: PersistentCounterProps, initialBuild: boolean, prevState: PersistentCounterState) {
        console.debug('build state from' + props.id);
        let counter = persistentStore.getOne(props.id);
        if (!persistentStore.hasOne(props.id) && testValues.has(props.id)) {
            counter = { ...testValues.get(props.id)! };
        }
        return {counter};
    }

    render(): React.ReactElement | null {
        if (this.state.counter === undefined) {
            console.error("counter can be undefined in normal mode!");
        }
    
        return (
            <div>
                <button onClick={() => {
                    incrementPersistent(this.props.id);
                }}>Persistent: {this.state.counter?.name}: {this.state.counter?.count}</button>
            </div>
        )
    }
}

export default PersistentCounter;