class MyRedux {
    static #state = null
    static #listeners = {}
    static #amountOflisteners = 0

    createStore = this._createStore.bind(this)

    _createStore(rootReducer, initialState) {
        this.constructor.#state = initialState
        return {
            getState: () => this.constructor.#state,
            subscribe: listener => {
                const index = this.constructor.#amountOflisteners
                const unsubscribe = () => {
                    delete this.constructor.#listeners[index]
                }
                this.constructor.#listeners[index] = listener
                this.constructor.#amountOflisteners++
                return unsubscribe
            },
            dispatch: action => {
                this.constructor.#state = rootReducer(this.constructor.#state, action)
                Object.values(this.constructor.#listeners).map(listener => listener())
            },
        }
    }
}

// Usage

const { createStore } = new MyRedux()

const count = 0
const rootReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
const listener1 = () => {
    console.log('1. State has been changed');
}
const listener2 = () => {
    console.log('2. State has been changed');
}

const store = createStore(rootReducer, count)
const unsubscribe1 = store.subscribe(listener1)
const unsubscribe2 = store.subscribe(listener2)
