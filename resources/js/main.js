(() => {
  // app/resources/js/main.js
  var html = document.querySelector("html");
  html.classList.remove("no-js");
  html.classList.add("js");
  function ready(fn) {
    "use strict";
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  ready(function() {
    "use strict";
    console.log("DOM is ready!");
    var menu = document.querySelector("#menu");
    var wrapper = document.querySelector("#overall-wrapper");
    menu.addEventListener("click", function() {
      wrapper.classList.toggle("off-left");
    });
  });
})();
