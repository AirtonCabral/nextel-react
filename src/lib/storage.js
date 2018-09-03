import CircularJSON from 'circular-json'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }

        return CircularJSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = CircularJSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (error) {
        console.error(error)
    }
}

export const loadStateFromSession = () => {
    try {
        const serializedState = sessionStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }

        return CircularJSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

 export const saveStateToSession = (state) => {
    try {
        const serializedState = CircularJSON.stringify(state)
        sessionStorage.setItem('state', serializedState)
    } catch (error) {
        console.error(error)
    }
}


export const loadObjectFromSession = (name) => {
    try {
        const serializedState = sessionStorage.getItem(name)
        if (serializedState === null) {
            return undefined
        }

        return CircularJSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

export const saveObjectToSession = (object, name) => {
    try {
        const serializeObject = CircularJSON.stringify(object)
        sessionStorage.setItem(name, serializeObject)
    } catch (error) {
        console.error(error)
    }
}