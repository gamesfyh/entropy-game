//Credit to IGME-330 Professors
const defaultData = {
    "appTitle": "FFXIV Profile Viewer",
    "favorites": []
  },
  storeName = "mhc4466-p1-settings";
  
  const readLocalStorage = () => {
    let allValues = null;
  
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
  
    return allValues;
  };
  
  const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  export const clearLocalStorage = () => writeLocalStorage(defaultData);
  
  export const setAppTitle = (str) => {
    const allValues = readLocalStorage();
  
    allValues.appTitle = str;
    writeLocalStorage(allValues);
  };
  
  export const getAppTitle = () => readLocalStorage().appTitle;
  
  export const addFavorite = (str) => {
    const allValues = readLocalStorage();
  
    allValues.favorites.push(str);
    writeLocalStorage(allValues);
  };
  
  export const getFavorites = () => readLocalStorage().favorites;

  //Attempts to remove the given id from the array of favorites
  export const removeFavorite = (id) => {
    const allValues = readLocalStorage();

    let arrayLength = allValues.favorites.length;
    for (let i = 0; i < arrayLength; i++) {
      if (allValues.favorites[i] == id) {
        allValues.favorites.splice(i, 1);
        arrayLength--;
      }
    }
    writeLocalStorage(allValues);
  }
  
  export const clearFavorites = () => {
    const allValues = readLocalStorage();
  
    allValues.favorites = [];
    writeLocalStorage(allValues);
  };

  export const getSearchTerm = () => readLocalStorage().searchTerm;

  export const setSearchTerm = (str) => {
    const allValues = readLocalStorage();

    allValues.searchTerm = str;
    writeLocalStorage(allValues);
  }

  export const getServerFilter = () => readLocalStorage().serverFilter;

  export const setServerFilter = (str) => {
    const allValues = readLocalStorage();

    allValues.serverFilter = str;
    writeLocalStorage(allValues);
  }

  export const getJSONByKey = (key) => readLocalStorage()[key];

  export const setJSONByKey = (key, json) => {
    const allValues = readLocalStorage();

    allValues[key] = json;
    writeLocalStorage(allValues);
  }
  