// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = …" if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Some features will not be available.");
}

let db;
const request = window.indexedDB.open("SimpleTaskListDB", 1);

request.onerror = event => {
    console.error("Database error: " + event.target.errorCode);
}

request.onsuccess = event => {
    db = event.target.result
};

// This event is only implemented in recent browsers
request.onupgradeneeded = event => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for this database
  const objectStore = db.createObjectStore("tasklist", { keyPath: "tasks" });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = event => {
    // Store values in the newly created objectStore.
    const taskObjectStore = db.transaction("tasklist", "readwrite").objectStore("tasklist");
    taskData.forEach(function(task) {
      taskObjectStore.add(task);
    });
  };
};


window.dbRequest = request;
