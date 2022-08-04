class SatoshiError extends Error {
    /**
     * @param { String } message
     */
    constructor(message) {
        super(message)
        this.name = "SatoshiError"
    }
}
module.exports = SatoshiError;