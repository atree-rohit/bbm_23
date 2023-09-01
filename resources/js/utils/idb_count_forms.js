const DB_NAME = 'BBMCountsDBForms';
const STORE_NAME = 'FormStore';

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
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: false });
        };
    });
}
export async function saveForm(userDetails) {
    const db = await openDB();
    if (userDetails.live) {
        try {
            const serialized = {id: new Date().getTime(), data: JSON.stringify(userDetails)}
            await storeNewRecord(db, serialized)
        } catch (error) {
            console.log(error)
            throw new Error(`Error storing data in ${STORE_NAME}`)
        }
    } else {
        const {id, ...dataWithoutId} = userDetails
        const serialized = {id: id, data: JSON.stringify(dataWithoutId)}

        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const existingRecord = await store.get(userDetails.id)
        existingRecord.onsuccess = async (event) => {
            if(!event.target.result){
                try {
                    await storeNewRecord(db, serialized)
                } catch (error) {
                    throw new Error(`Error storing data in ${STORE_NAME}`)
                }
            } else {
                const fields = ["latitude", "longitude", "coordinates", "location", "date", "start_time"];
                const existingData = JSON.parse(event.target.result.data)
                const fieldsMatch = fields.every((f) => userDetails[f] === existingData[f]);
                if (fieldsMatch) {
                    if (userDetails.status !== existingData.status || userDetails.validated !== existingData.validated) {
                        try {
                            const updateTransaction = db.transaction([STORE_NAME], 'readwrite');
                            const updateStore = updateTransaction.objectStore(STORE_NAME);
                            await updateStore.put(serialized);
                            await updateTransaction.complete; // Ensure the transaction completes before resolving.
                        } catch (error) {
                            throw new Error(`Error updating data in ${STORE_NAME}`);
                        }
                    }
                } else {
                    try {
                        await storeNewRecord(db, serialized)// Ensure the transaction completes before resolving.
                    } catch (error) {
                        throw new Error(`Error storing data in ${STORE_NAME}`);
                    }
                }
            }

        }
    }
}


export async function saveForm1(userDetails) {
    return openDB().then(db => {
        const { id, ...dataWithoutId } = userDetails;
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        if (userDetails.live) {
            const request_live = store.put(dataWithoutId);
            return new Promise((resolve, reject) => {
                request_live.onsuccess = event => {
                    resolve();
                };

                request_live.onerror = event => {
                    reject(`Error storing data in ${storeName}`);
                };
            });
        } else {
            console.log("idb_count_Forms: saveForm", userDetails)
            const request = store.getAll();
            request.onsuccess = (event) => {
                if(event.target.result.length == 0){
                    store.put(dataWithoutId); // Save the new record
                }
                event.target.result.forEach((r) => {
                    console.log(r)
                    let updateFlag = false; 
                    const fields = ["latitude", "longitude", "coordinates", "location", "date", "start_time"];
                    const fieldsMatch = fields.every((f) => dataWithoutId[f] === r[f]);
                    if (fieldsMatch) {
                        // Fields match, now check status and validated
                        if (dataWithoutId.status !== r.status || dataWithoutId.validated !== r.validated) {
                            // Status or validated is different, so remove the existing record
                            store.delete(r.id);
                            updateFlag = true;
                        }
                    } else {
                        // Fields don't match, save the record
                        updateFlag = true;
                    }

                    if (updateFlag) {
                        store.put(dataWithoutId); // Save the new record
                    }
                });
            };

        }
        return transaction.complete; // Ensure the transaction completes before resolving
    });
}

export async function getForms() {
    console.log("idb_count_Forms: getForms")
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll(); // Assuming user_details is stored with ID 1

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


async function storeNewRecord(db, userDetails){
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.put(userDetails);
    await transaction.complete; // Ensure the transaction completes before resolving.
}