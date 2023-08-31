const DB_NAME = 'BBMCountsDB';
const STORE_NAME = 'userDetailsStore';

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 2);

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

export function saveData(userDetails) {
    return openDB().then(db => {
        const { id, ...dataWithoutId } = userDetails;
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll()
        let new_flag = true
        request.onsuccess = event => {
            event.target.result.forEach((r) => {
                if(JSON.stringify(r) == JSON.stringify(dataWithoutId)){
                    new_flag = false
                } else {
                    store.delete(r.id)
                }
            })
            if(new_flag){
                store.put(dataWithoutId);
            }
        }
        return transaction.complete; // Ensure the transaction completes before resolving
    });
}

export function getData() {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll(); // Assuming user_details is stored with ID 1

            request.onsuccess = event => {
                const userDetails = event.target.result;
                resolve(userDetails[0]);
            };

            request.onerror = event => {
                reject('Error retrieving user details');
            };
        });
    });
}
