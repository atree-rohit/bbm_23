export default function createSelectivePersistPlugin(moduleName) {
    return (store) => {
        store.subscribe((mutation, state) => {
            if (mutation.type.startsWith(moduleName) && state[moduleName].shouldPersist) {
                // Store the relevant state portion in localStorage
                localStorage.setItem(`${moduleName}_state`, JSON.stringify(state[moduleName]));
            }
        });
    };
}