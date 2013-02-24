// the tests for our project

(function() {

  var echo = function(message, hasPassed) {
    $('#testcases').append($('<li>', { html:message }));
  };

  // define some testhelpers
  var assertEqual = function(text, b, a) {
    text = a == b ? text : "FAILED: " + text + "<br />Exptected: " + a + "<br />Actual value: " + b;
    echo(text);
  };

  // the actual tests:
  assertEqual('assertEqual is working as expected', 1, 1);
  assertEqual('assertEqual is working as expected (this one should fail)', 0, 1);

  // flo function library tests
  assertEqual('getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3") => "foo (2 3 (1 ()) (test)) bar"', getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3"), "foo (2 3 (1 ()) (test)) bar");
  assertEqual('getContentInBrackets returns an empty string for empty brackets', getContentInBrackets("()"), "");
  assertEqual('getContentInBrackets returns original string when nothing to extract', getContentInBrackets("1 2 3"), "1 2 3");

  // some cons stuff
  assertEqual('cons(1, 2).inspect() => (1 . 2)', cons(1, 2), "(1 . 2)");


})();