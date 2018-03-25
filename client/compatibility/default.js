/**
 *  This which are put in the compatibility js can be accessed from anywhere, this is important, because each template and other scripts are run in their own space, meaning
 *  that variables within a scope will remain in that scope.
 *  I find it handy to have a global variable object that i can call anywhere, for things such as configurations
 */

// Libraries which need a global variable, such as jQuery etc

var globalVariable = {
    // this flag indicates whether or not i want to enable the kickout, when not logged in it will boot users out
    loggingSecurity: true,
    // timer used for the connection lost tracker, it is a threshold observed which basically triggers the connection lost
    connectionTime: 3000
}
