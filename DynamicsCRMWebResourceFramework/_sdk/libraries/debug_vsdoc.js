/*jsl:ignore*/
var debug = {
    log: function (object) {
        ///<summary>Call the console.log method if available.  Adds an entry into the logs array for a callback specified via debug.setCallback.</summary>
        ///<param name="object" type="Object">Any valid JavaScript object</param>
    },

    error: function (object) {
        ///<summary>Call the console.error method if available, otherwise call console.log.  Adds an entry into the logs array for a callback specified via debug.setCallback.</summary>
        ///<param name="object" type="Object">Any valid JavaScript object</param>
    },

    info: function (object) {
        ///<summary>Call the console.info method if available, otherwise call console.log.  Adds an entry into the logs array for a callback specified via debug.setCallback.k.</summary>
        ///<param name="object" type="Object">Any valid JavaScript object</param>
    },

    warn: function (object) {
        ///<summary>Call the console.warn method if available, otherwise call console.log.  Adds an entry into the logs array for a callback specified via debug.setCallback.</summary>
        ///<param name="object" type="Object">Any valid JavaScript object</param>

    },

    debug: function (object) {
        ///<summary>Call the console.debug method if available, otherwise call console.log.  Adds an entry into the logs array for a callback specified via debug.setCallback.</summary>
        ///<param name="object" type="Object">Any valid JavaScript object</param>
    },

    setCallback: function (callback, force, limit) {
        ///<summary>Set a callback to be used if logging isn’t possible due to console.log not existing.  If unlogged logs exist when callback is set, they will all be logged immediately unless a limit is specified.</summary>
        ///<param name="callback" type="Function">The aforementioned callback function.  The first argument is the logging level, and all subsequent arguments are those passed to the initial debug logging method.</param>
        ///<param name="force" type="Boolean" optional="True">If false, log to console.log if available, otherwise callback.  If true, log to both console.log and callback.</param>
        ///<param name="limit" type="Number" optional="True">If specified, number of lines to limit initial scrollback to.</param>
    },

    setLevel: function (level) {
        ///<summary>Set a minimum or maximum logging level for the console.  Doesn’t affect the debug.setCallback callback function, but if set to 0 to disable logging, Pass-through console methods will be disabled as well.</summary>
        ///<param name="level" type="Number" optional="True">If 0, disables logging.  If negative, shows N lowest priority levels of log messages.  If positive, shows N highest priority levels of log messages.</param>
    }
};

/*jsl:end*/
