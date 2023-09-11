const DB_NAME = 'BBMCountsCurrentSpecies';
const STORE_NAME = 'CurrentSpecies';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onerror = event => {
            reject('Error opening database');
        };

        request.onsuccess = event => {
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: false });
        };
    });
}

async function saveCurrentSpeciesData(data) {
    try {
        const db = await openDB(STORE_NAME);
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(data);

        return new Promise((resolve, reject) => {
            request.onsuccess = event => {
                resolve();
            };

            request.onerror = event => {
                reject(`Error storing data in ${STORE_NAME}`);
            };
        });
    } catch (error) {
        throw new Error(`Error opening database: ${error}`);
    }
}

async function getCurrentSpeciesData() {
    try {
        const db = await openDB(STORE_NAME);
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(1);

        const cursor = store.openCursor(null, 'prev');

        return new Promise((resolve, reject) => {
            cursor.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    // Get the data associated with the highest/latest key
                    const data = cursor.value;
                    resolve(data);
                } else {
                    // No more data to retrieve
                    resolve(null);
                }
            };

            cursor.onerror = event => {
                reject(`Error retrieving data from ${STORE_NAME}`);
            };
        });
    } catch (error){
        throw new Error(`Error opening database: ${error}`);
    }
}

async function clearCurrentSpeciesData(){
    try {
        const db = await openDB(STORE_NAME);
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        return new Promise((resolve, reject) => {
            request.onsuccess = event => {
                resolve();
            };

            request.onerror = event => {
                reject(`Error clearing data in ${STORE_NAME}`);
            };
        });
    } catch (error) {
        throw new Error(`Error opening database: ${error}`);
    }
}

export { saveCurrentSpeciesData, getCurrentSpeciesData, clearCurrentSpeciesData}