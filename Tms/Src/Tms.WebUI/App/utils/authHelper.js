const key = 'tms';

export default {
    saveAuth: (id, token) => {
        localStorage.setItem(key, JSON.stringify({ id, token }));
    },

    clearAuth: () => {
        localStorage.removeItem(key);
    },

    isLogged: () => {
        let item = localStorage.getItem(key);
        if (item) {
            return true;
        }

        return false;
    },

    getId: () => {
        let item = localStorage.getItem(key);
        let id = '';
        if (item) {
            id = JSON.parse(item).id;
        }

        return id;
    },

    getToken: () => {
        let item = localStorage.getItem(key);
        let token = null;
        if (item) {
            token = JSON.parse(item).token;
        }

        return token;
    }
};