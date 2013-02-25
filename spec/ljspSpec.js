describe("ljsp", function() {
  // flo function library tests
  // assertEqual('getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3") => "foo (2 3 (1 ()) (test)) bar"', getContentInBrackets("(foo (2 3 (1 ()) (test)) bar) 2 3"), "foo (2 3 (1 ()) (test)) bar");
  // assertEqual('getContentInBrackets returns an empty string for empty brackets', getContentInBrackets("()"), "");
  // assertEqual('getContentInBrackets returns original string when nothing to extract', getContentInBrackets("1 2 3"), "1 2 3");


  describe('cons', function() {

    it('always has a car and a cdr', function() {
      var a = cons(1, 2),
          b = cons(1),
          c = cons();

      expect(car(a)).toEqual(1);
      expect(cdr(a)).toEqual(2);
      expect(car(b)).toEqual(1);
      expect(cdr(b)).toEqual(null);
      expect(car(c)).toEqual(null);
      expect(cdr(c)).toEqual(null);
    });

    it("can create lists (linked cons)", function() {
      expect(_print(cons(1, cons(2, cons(3, cons(4)))))).toEqual("(1 2 3 4)");
    });

    it("can create pairs (a cons of two primitive datatypes)", function() {
      expect(_print(cons(1, 2))).toEqual("(1 . 2)");
    });

  });

  describe('list', function() {

    it("converts a liststring into linked cons cells", function() {
      expect(list("1 2 3 4")).toEqual(cons(1, cons(2, cons(3, cons(4)))));
    });

    it("parses primitive datatypes", function() {
      expect(list("'1' '2' '3' '4'")).toEqual(cons("1", cons("2", cons("3", cons("4")))));
      expect(list("1 2 3 4")).toEqual(cons(1, cons(2, cons(3, cons(4)))));
    });

    it("doesn't create pairs (but lists)", function() {
      expect(list("1 2")).toEqual(cons(1, cons(2)));
    });

  });

});








