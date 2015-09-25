
this.getExpectedDesktopCaption = function (language) {
    if (language == "eng") {
        return "Hello";
    } else {
        return "Hoi";
    }  
};


rule("%{itemPattern} should be rendered in %{columns: [0-9]+} column table layout", function (objectName, parameters) {
    var allItems = findAll(parameters.itemPattern);
    var columns = parseInt(parameters.columns);

    var currentColumn = 0;

    for (var i = 0; i < allItems.length - 1; i += 1) {
        if (currentColumn < columns - 1) {
            this.addObjectSpecs(allItems[i].name, [
                "left-of " + allItems[i + 1].name + " 0 to 5px",
                "aligned horizontally all " + allItems[i + 1].name
            ]);
        }

        var j = i + columns;

        if (j < allItems.length) {
            this.addObjectSpecs(allItems[i].name, [
                "above " + allItems[j].name + " 0 to 5px",
                "aligned vertically all " + allItems[j].name
            ]);
        }

        currentColumn += 1;
        if (currentColumn === columns) {
            currentColumn = 0;
        }
    }

});



rule("squared", function (objectName, parameters) {
    this.addSpecs([
        "width 90% of " + objectName + "/height" 
    ]);
});



