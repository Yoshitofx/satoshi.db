const fs = require("fs");
const SatoshiError = require("./SatoshiError.js");
const { set, get, unset, has } = require("lodash");
class SatoshiDatabase {
    /**
     * @type {String}
     * @private
     */
    #fileName;
    /**
     * @type {Object}
     * @private
     */
    #file = {};

    /**
     * @param {String} dataFile
     * @constructor 
     */
    constructor (dataFile = "database.json") {
        this.#fileName = dataFile
        if (!fs.existsSync(dataFile)) {
            fs.writeFileSync(dataFile,'{}', function (err) {
                if (err) throw err;
            })
        } else {
            this.#file = JSON.parse(fs.readFileSync(dataFile, "utf8"));
        }
    }

    /**
     * @param {String} key 
     * @param {v} value 
     */
    set(key, value) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        if (value === 0) {
            set(this.#file, key, value);
            fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
            return this.get(key);
        }
        if (!value || value === undefined || value === null) {
            throw new SatoshiError("Hatalı veri girildi!");
        }
        set(this.#file, key, value);
        fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
        return this.get(key);
    }

    /**
     * @param {String} key 
     * @returns {any}
     */
    get(key) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        return get(this.#file, key);
    }

    /**
     * @param {String} key 
     * @returns {any}
     */
    fetch(key) {
        return this.get(key);
    }

    /**
     * @param {String} key
     * @returns {Boolean}
     */
    has(key) {
        if(!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar kullanımı!");
        }
        return has(this.#file, key);
    }

    /**
     * @param {String} key
     * @returns {Boolean} 
     */
    delete(key) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar kullanımı!");
        }
        const data = this.get(key);
        if (!data) {
            return false;
        }
        unset(this.#file, key);
        fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
        return true;
    }

    /**
     * @param {String} key 
     * @param {Number} amount 
     * @returns {Number}
     */
    add(key, amount) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        if (!amount || typeof amount !== "number") {
            throw new SatoshiError("Hatalı miktar girildi!");
        }
        const data = get(this.#file, key) || 0;
        if (isNaN(data)) {
            throw new SatoshiError("Girilen anahtar verisi sayı değil!")
        } 
        this.set(key, data + amount);
        return this.get(key);
    }

    /**
     * @param {String} key 
     * @param {Number} amount 
     * @returns {Number}
     */
    subtract(key, amount) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        if (!amount || typeof amount !== "number") {
            throw new SatoshiError("Hatalı miktar girildi!");
        }
        const data = get(this.#file, key) || 0;
        if (isNaN(data)) {
            throw new SatoshiError("Girilen anahtar verisi sayı değil!");
        } 
        this.set(key, data - amount);
        return this.get(key);
    }

    /**
     * @param {String} key 
     * @param {any} value 
     */
    push(key, value) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        if (value !== 0 && !value && typeof value !== "boolean") {
            throw new SatoshiError("Hatalı değer girildi!");
        }
        const data = this.get(key);
        if (!data) {
            this.set(key, [value]);
            return this.get(key);
        }
        if (!Array.isArray(data)) {
            throw new SatoshiError("Girilen anahtar verisi array değil!");
        } else if (Array.isArray(data)) {
            data.push(value);
            this.set(key, data);
            return this.get(key);
        } else {
            this.set(key, [value]);
            return this.get(key);
        }
    }

    /**
     * @param {String} key 
     * @param {any} value 
     */
    pull(key, value) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        if (value !== 0 && !value && typeof value !== "boolean") {
            throw new SatoshiError("Hatalı değer girildi!");
        }
        const data = this.get(key);
        if (!Array.isArray(data)) {
            throw new SatoshiError("Girilen anahtar verisi array değil!");
        }
        const newData = data.filter(x => !x.includes(value));
        this.set(key, newData);
        return this.get(key);
    }

    /**
     * @returns {Object}
     */
    all() {
        return this.#file;
    }
    /**
     * @param {String} key 
     * @returns {"string" | "number" | "bigint" | "boolean" | "symbol" | "array" | "undefined" | "object" | "function"}
     */
    type(key) {
        if (!key || typeof key !== "string") {
            throw new SatoshiError("Hatalı anahtar girildi!");
        }
        const data = this.get(key);
        if (Array.isArray(data)) {
            return "array";
        } else {
            return typeof data;
        }
    }

    /**
     * @param {String} newFileName 
     */
    backup(newFileName) {
        if (!newFileName || typeof newFileName !== "string") {
            throw new SatoshiError("Hatalı dosya ismi girildi girildi!");
        }
        fs.writeFileSync(`${newFileName}.json`, JSON.stringify(this.#file, null, 2));
        return true;
    }

    /**
     * @returns {Boolean}
     */
    deleteAll() {
        this.#file = {};
        fs.writeFileSync(this.#fileName, JSON.stringify({}, null, 2));
        return true;
    }
}
module.exports = {SatoshiDatabase};
