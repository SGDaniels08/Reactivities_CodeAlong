// Sample of how to use mobx
import { makeObservable, observable } from 'mobx';      // two parameters, what object you want to make observable, and a list of properties you want to observe

export default class CounterStore {
    title = 'Counter store';
    count = 0;

    constructor() {
        makeObservable(this, {
            title: observable,
            count: observable
        })
    }
}