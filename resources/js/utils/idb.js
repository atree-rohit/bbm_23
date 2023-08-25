// indexedDBUtils.js
const DB_NAME = 'BBMCountsDB';
const STORE_NAME = 'userDetailsStore';

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onerror = event => {
            reject('Error opening database');
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };
    });
}

export function saveUserDetails(userDetails) {
    openDB().then(db => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.put(userDetails);
    });
}

export function getUserDetails() {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(1); // Assuming user_details is stored with ID 1

            request.onsuccess = event => {
                const userDetails = event.target.result;
                resolve(userDetails);
            };

            request.onerror = event => {
                reject('Error retrieving user details');
            };
        });
    });
}
