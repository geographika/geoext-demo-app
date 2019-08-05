module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "ol": false,
        "Ext": false,
        "proj4": false,
        "GeoExt": false
    },
    "parserOptions": {
        "ecmaVersion": 5
    },
    "rules": {
        "no-trailing-spaces": "error",
        "indent": [
            "error",
            4
        ],
        //"linebreak-style": [
        //  "error",
        //  "unix"
        //],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
