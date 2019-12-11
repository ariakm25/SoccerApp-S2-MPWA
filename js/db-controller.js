const idbPromised = idb.open("favourites", 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains("favs")) {
    upgradedDb.createObjectStore("favs", { keyPath: "favId" });
  }
});

const dbGetFavourite = favId => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favs", `readonly`);
        return transaction.objectStore("favs").get(favId);
      })
      .then(data => {
        if (data !== undefined) {
            resolve(data);
          } else {
            reject(new Error("Favorite not Found"));
          }
      });
  });
};

const dbGetAllFavourites = () => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favs", `readonly`);
        return transaction.objectStore("favs").getAll();
      })
      .then(data => {
        if (data !== undefined) {
          resolve(data);
        } else {
          reject(new Error("Favorite not Found"));
        }
      });
  });
};

const dbInsertFavourite = (fav) => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favs", `readwrite`);
        transaction.objectStore("favs").add(fav);
        return transaction;
      })
      .then(transaction => {
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};

const dbDeleteFavourite = favId => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favs", `readwrite`);
        transaction.objectStore("favs").delete( parseInt(favId) );
        return transaction;
      })
      .then(transaction => {
        console.log(transaction)
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};
