describe("ljsp", function() {
  // flo function library tests
  // assertEqual('getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3") => "foo (2 3 (1 ()) (test)) bar"', getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3"), "foo (2 3 (1 ()) (test)) bar");
  // assertEqual('getContentInBrackets returns an empty string for empty brackets', getContentInBrackets("()"), "");
  // assertEqual('getContentInBrackets returns original string when nothing to extract', getContentInBrackets("1 2 3"), "1 2 3");


  describe('cons', function() {

    it("can create pairs", function() {
      expect(_print(cons(1, 2))).toEqual("(1 . 2)");
    });

    it("can create and print lists", function() {
      expect(_print(cons(1, cons(2, cons(4))))).toEqual("(1 2 4)");
    });

  })

});
