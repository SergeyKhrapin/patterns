class User {
    static #isInstance = false
    constructor(name, surname) {
        if (this.constructor.#isInstance) {
            throw new Error(`Only one instance of ${this.constructor.name} class can be created.`)
        }
        this.name = name
        this.surname = surname
        this.constructor.#isInstance = true
    }
}

const user1 = new User('Tom', 'Hanks')
const user2 = new User('Petro', 'Petrenko') // Error
