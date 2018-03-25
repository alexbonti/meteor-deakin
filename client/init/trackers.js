var globalVariable = {
    // this flag indicates whether or not i want to enable the kickout, when not logged in it will boot users out
    loggingSecurity: true,
    // timer used for the connection lost tracker, it is a threshold observed which basically triggers the connection lost
    connectionTime: 3000,
    notificationTimeOut: 3000

}

/**
 *  Tracker - a tracker is a function which continously observerves "observables" variables, which
 *  are all those variables which can be triggered by a status change,
 *  for example a db item or a Meteor.user() state
 */

Meteor.startup(function () {

    Session.set('showHeader', false);
    Session.set('lostConnection', false);

    // Setting notifications timeouts which is used by notificationJS
    _.extend(Notifications.defaultOptions, {
        timeout: globalVariable.notificationTimeOut
    });

    /** Tracker SecurityBouncer
     *  This tracker is used to keep track whether a user is logged in or not, if a person is not
     *  logged in, the user gets sent to the login screen ( / )
     *  Note : in order to avoid it to run the first time, I used the c.firstrun to find out if it
     *  was the first time running, therefore avoiding it all together.
     */

    if (globalVariable.loggingSecurity) {
        Tracker.autorun(function (c) {
            var loggedIn = Meteor.user();
            if (!c.firstRun) {
                if (loggedIn == null) {
                    Router.go('/');
                }
            }

        });
    }

    /** Tracker ConnectionMonitor
     * This tracker keeps track of the current connection to the server observing the DDP status
     * through Meteor.status , when it fails,
     * the connecting template kicks in. To overcome 'minimal' sustainable connection losses, i have
     * inserted a threshold, therefore the
     * connection is "lost" if after the threshold, the connection is still lost.
     */

    Tracker.autorun(function (c) {
        var connected = Meteor.status().connected;
        if (connected) {

            Session.set('lostConnection', false)
        } else {
            setTimeout(function () {
                newTest = Meteor.status().connected;
                if (newTest == false) {
                    Session.set('lostConnection', true);
                }
            }, globalVariable.connectionTime);
        }

    });

});
