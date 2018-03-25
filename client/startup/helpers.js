/**
 *  This is a global helper, meaning that it can be called from anywhere from any template, we use it in the layout to command the navbar toggle.
 *  When at any stage the Session variable 'showHeader' changes from true to false, this becomes triggers and the navbar is shown/hidden
 */

Template.registerHelper('showNavBar', function () {
    return Meteor.user();
});

Template.registerHelper('showFootBar', function () {
    return Session.get('showFooter');
});

Template.registerHelper('isLostConnection', function () {
    return Session.get('lostConnection');
});