"use strict";

var attributes = [{
  name: "Color",
  options: [1, 2, 3, 4]
}, {
  name: "Size",
  options: [5, 6, 7, 8]
}];

var recurseAttributes = function recurseAttributes(att) {
  if (att.length > 0) {
    var first = att.slice(0);
    var remaining = recurseAttributes(att);
    var all = [];

    for (var i = 0; i < remaining.length; i++) {
      all.push(remaining.options[i]);
    }

    return all;
    console.log(all);
  }
};

recurseAttributes(attributes);