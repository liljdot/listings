// @ts-expect-error import from js file
import { getItem, setItem } from "@/lib/utils/localStorage"
import { useEffect, useState } from "react";

const typedGetItem = getItem as <T>(key: string) => T | undefined
const typedSetItem = setItem as <T>(key: string, value: T) => void

// This hook receives two parameters:
// storageKey: This is the name of our storage that gets used when we retrieve/save our persistent data.
// initialState: This is our default value, but only if the browser storage doesn't exist, otherwise it gets overwritten by the browser storage.


const usePersistState = <T>(storageKey: string, initialState?: T): [T | undefined, (newState: T | undefined) => void] => {
    // Initiate the internal state.
    const [state, setInternalState] = useState<T | undefined>(initialState);

    // Only on our initial load, retrieve the data from the store and set the state to that data.
    useEffect(() => {

        // Retrieve the data from the browser storage.
        const storageInBrowser = typedGetItem<T>(storageKey);

        // If the store exists, overwrite the state with the store's data.
        // Otherwise if the store doesn't exist then "initialState" remains our default value.
        if (storageInBrowser) {
            setInternalState(storageInBrowser);
        }
    }, [storageKey]);

    // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
    const setState = (newState: T | undefined) => {
        typedSetItem(storageKey, newState);
        setInternalState(newState);
    };

    return [state, setState];
}

export default usePersistState