import { withResubAutoSubscriptions } from "resub";
import { testStore } from "../stores";

function increment(id: number) {
    const element = testStore.getOne(id).read();
    if (element) {
        element.count += 1;
        testStore.setOne(element);
    }
}

export const Counter = withResubAutoSubscriptions(function counter(props: { id: number }) {
    const id = props.id;
    const counter = testStore.getOne(id).read();

    if(counter === undefined) {
        console.error("counter should always be set in suspense mode!");
    }
    
    return (
        <div>
            <button onClick={() => increment(id)}>{counter?.name}: {counter?.count}</button>
        </div>
    )
})
