const key = 'tms';

export default {
    saveAuth: (login, token) => {
        localStorage.setItem(key, JSON.stringify({ login: login, access_token: token }));
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

    getLogin: () => {
        let item = localStorage.getItem(key);
        let login = '';
        if (item) {
            login = JSON.parse(item).login;
        }

        return login;
    },

    getToken: () => {
        let item = localStorage.getItem(key);
        let token = null;
        if (item) {
            token = JSON.parse(item).access_token;
        }

        return token;
    }
}