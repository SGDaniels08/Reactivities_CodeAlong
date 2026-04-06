// Sample of how to use mobx
import { action, makeAutoObservable, makeObservable, observable } from 'mobx';      // two parameters, what object you want to make observable, and a list of properties you want to observe

export default class CounterStore {
    title = 'Counter store';
    count = 42;

    // makeObservable if you want to have fine-grain control over mobx properties
    // 
    // constructor() {
    //     makeObservable(this, {
    //         title: observable,
    //         count: observable,
    //         increment: action,      // Functons are type "action" in mobx
    //         decrement: action       // If you don't use arrow functions below, need to use "action.bound"
    //     })
    // }
    // 
    // makeAutoObservable will handle all of the above automatically

    constructor() {
        makeAutoObservable(this);
    }

    // Inside a class, if we don't use an arrow function like below, we'll have to make sure the method is bound to the class
    increment = (amount = 1) => {
        this.count += amount;
    }

    decrement = (amount = 1) => {
        this.count -= amount;
    }
}