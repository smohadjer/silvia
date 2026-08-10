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
  var Accordion = class {
    constructor(element) {
      this.element = element;
      this.summary = element.querySelector("summary");
      this.content = element.querySelector(".accordion__content");
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener("click", (event) => this.onClick(event));
    }
    onClick(event) {
      event.preventDefault();
      this.element.style.overflow = "hidden";
      if (this.isClosing || !this.element.open) {
        this.open();
      } else if (this.isExpanding || this.element.open) {
        this.shrink();
      }
    }
    shrink() {
      this.isClosing = true;
      const startHeight = "".concat(this.element.offsetHeight, "px");
      const endHeight = "".concat(this.summary.offsetHeight, "px");
      if (this.animation) {
        this.animation.cancel();
      }
      this.animation = this.element.animate({
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: "ease-out"
      });
      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = () => {
        this.isClosing = false;
      };
    }
    open() {
      this.element.style.height = "".concat(this.element.offsetHeight, "px");
      this.element.open = true;
      window.requestAnimationFrame(() => this.expand());
    }
    expand() {
      this.isExpanding = true;
      const startHeight = "".concat(this.element.offsetHeight, "px");
      const styles = window.getComputedStyle(this.element);
      const borders = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
      const endHeight = "".concat(this.summary.offsetHeight + this.content.offsetHeight + borders, "px");
      if (this.animation) {
        this.animation.cancel();
      }
      this.animation = this.element.animate({
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: "ease-out"
      });
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => {
        this.isExpanding = false;
      };
    }
    onAnimationFinish(open) {
      this.element.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.element.style.height = "";
      this.element.style.overflow = "";
    }
  };
  ready(function() {
    "use strict";
    console.log("DOM is ready!");
    var menu = document.querySelector("#menu");
    var wrapper = document.querySelector("#overall-wrapper");
    menu.addEventListener("click", function() {
      wrapper.classList.toggle("off-left");
      menu.classList.toggle("is-active");
      var isOpen = menu.classList.contains("is-active");
      menu.setAttribute("aria-expanded", isOpen);
      menu.setAttribute("aria-label", isOpen ? "Men\xFC schlie\xDFen" : "Men\xFC \xF6ffnen");
    });
    document.querySelectorAll(".accordion").forEach(function(element) {
      new Accordion(element);
    });
  });
})();
