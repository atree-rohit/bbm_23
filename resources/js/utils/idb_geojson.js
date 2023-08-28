// idb.js

function openDB(storeName) {
    const DB_NAME = 'BBMCountsDBGeojson';
    let DB_VERSION = 2; // Ensure that this version is updated when making changes

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = event => {
            reject(`Error opening database for store ${storeName}: ${event.target.error}`);
        };

        request.onsuccess = event => {
            const db = event.target.result;
            resolve(db);
        };
        
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

export async function saveData(storeName, data) {
    try {
        const { id, ...dataWithoutId } = data;
        const db = await openDB(storeName);
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(dataWithoutId);
        console.log('saveData', storeName, dataWithoutId)

        return new Promise((resolve, reject) => {
            request.onsuccess = event => {
                resolve();
            };

            request.onerror = event => {
                reject(`Error storing data in ${storeName}`);
            };
        });
    } catch (error) {
        throw new Error(`Error opening database: ${error}`);
    }
}

export async function getData(storeName) {

    try {
        const db = await openDB(storeName);
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(1);

        return new Promise((resolve, reject) => {
            request.onsuccess = event => {
                const data = event.target.result;
                resolve(data);
            };

            request.onerror = event => {
                reject(`Error retrieving data from ${storeName}`);
            };
        });
    } catch (error) {
        return null;
    }
}
