describe("ljsp:", function() {

  describe('the basic construct of lisp is the cons cell:', function() {

    it('we can create cons cells using the cons (read: construct) function', function() {
      expect(cons(1, 2)).toEqual(cons(1, 2));
    });

    it('they consist of a car (first item) and a cdr (second item) which can be accessed by the car and cdr functions', function() {
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

    it("to test wheater or not something is a cons cell, use the consP function (p standing for predicate)", function() {
      expect(consP(cons(1))).toEqual(true);
      expect(consP(1)).toEqual(false);
    })

    it("put another cons cell into the cdr and you get a list (or linked cons cell)", function() {
      var myList = cons(1, cons(2, cons(3, cons(4))));

      expect(car(myList)).toEqual(1);
      expect(cdr(myList)).toEqual(cons(2, cons(3, cons(4))));
    });

    it("lists are terminated by null (in the cdr of the last cons cell)", function() {
      var myList = cons(1, cons(2));
      expect(cddr(myList)).toEqual(null);

    });

    it("the cddr function returns the cdr of the cdr, cadr the car of the cdr", function() {
      var myList = cons(1, cons(2, cons(3, cons(4))));

      expect(cadr(myList)).toEqual(2);
      expect(cddr(myList)).toEqual(cons(3, cons(4)));
    });

    it("cons cells that contain two primitive types (as opposed to another cons cell in the cdr) are considered pairs", function() {
      expect(cons(1, 2)).toEqual(cons(1, 2));
    });

  });

  describe('the list function takes a string and turns it into a list:', function() {

    it("it is syntaxtic sugar for not having to write too many conses yourself", function() {
      expect(list("1 2 3 4")).toEqual(cons(1, cons(2, cons(3, cons(4)))));
      expect(list("(10 20 30 40)")).toEqual(cons(10, cons(20, cons(30, cons(40)))));
      expect(list("(1 2 3 4)")).toEqual(cons(1, cons(2, cons(3, cons(4)))));
    });
    
    it("it parses primitive datatypes the way JSON does", function() {
      expect(list("'1' '2' '3' '4'")).toEqual(cons("1", cons("2", cons("3", cons("4")))));
      expect(list("1 2 3 4")).toEqual(cons(1, cons(2, cons(3, cons(4)))));
    });

    it("trying to create pairs will fail, a list of two elements is still a list (a cons linked to a cons linked to nil)", function() {
      expect(list("1 2")).toEqual(cons(1, cons(2)));
    });

  });

  describe('the _print function is the opposite of the list function:', function() {

    it("print returns strings of cons cells", function() {
      expect("(1 2 3 4)").toEqual(_print(cons(1, cons(2, cons(3, cons(4))))));
      expect("(10 20 30 40)").toEqual(_print(cons(10, cons(20, cons(30, cons(40))))));
      expect("(1 2 3 4)").toEqual(_print(cons(1, cons(2, cons(3, cons(4))))));
    });

    it("like the list function, print is aware of datatypes, the way JSON is", function() {
      expect("(1 2 3 4)").toEqual(_print(cons(1, cons(2, cons(3, cons(4))))));
      expect('("1" "2" "3" "4")').toEqual(_print(cons('1', cons('2', cons('3', cons('4'))))));
    });
    
    it("pairs have a special syntax, having a dot seperating the two values (the inbound dot in lisp is a shortcut for the outbound cons function)", function() {
      expect("(1 . 2)").toEqual(_print(cons(1, 2)));
    });

  });


  describe('some functions we have in lisp:', function() {

    describe('_map:', function() {

      it("the _map function transforms each element of a list given a transformer function", function() {
        expect(_map(function(a) { return a * a; }, list("1 2 3 4"))).toEqual(list("1 4 9 16"));
        expect(_map(function(a) { return a + "foo"; }, list("1 2 3 4"))).toEqual(list("'1foo' '2foo' '3foo' '4foo'"));
      });

    });

    describe('_reduce:', function() {

      it("the reduce function reduces a list to a single value", function() {
        expect(_reduce(function(mem, a) { return mem + a * 1000; }, list("1 2 3 4"))).toEqual(10000);
      });

    });

  });

});
