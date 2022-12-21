(function () {
	'use strict';

	//Helper classes to HTML for styling of nojs version
	var html = document.querySelector('html');
	html.classList.remove('no-js');
	html.classList.add('js');

	//taken from http://youmightnotneedjquery.com/
	function ready(fn) {

	  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}
	ready(function () {

	  console.log('DOM is ready!');
	  var menu = document.querySelector('#menu');
	  var wrapper = document.querySelector('#overall-wrapper');
	  menu.addEventListener('click', function () {
	    wrapper.classList.toggle('off-left');
	  });
	});

})();
