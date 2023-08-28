const DB_NAME = 'BBMCountsDBObservations';
const STORE_NAME = 'ObservationsStore';

export function openDB() {
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
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };
    });
}

export function saveObservationData(userDetails) {
    return openDB().then(db => {
        const { id, ...dataWithoutId } = userDetails;
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.put(dataWithoutId);
        return transaction.complete; // Ensure the transaction completes before resolving
    });
}

export function getObservationData() {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(1); // Assuming user_details is stored with ID 1

            request.onsuccess = event => {
                const userDetails = event.target.result;
                console.log(event, userDetails)
                resolve(userDetails);
            };

            request.onerror = event => {
                reject('Error retrieving user details');
            };
        });
    });
}
