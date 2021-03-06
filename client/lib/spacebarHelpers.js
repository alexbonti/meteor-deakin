Template.registerHelper('debug', function(optionalValue) {
    if (typeof console !== "undefined" || typeof console.log !== "undefined") {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
        if (optionalValue) {
            console.log("Value");
            console.log("====================");
            console.log(optionalValue);
        }
    }

    // For IE8
    alert(this);

    if (optionalValue) {
        alert(optionalValue);
    }
});

Template.registerHelper('constant', function(what) {
    return Meteor.App[what.toUpperCase()];
});
