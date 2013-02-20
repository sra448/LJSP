// this is a useless excercise to get some lisp list stuff into javascript
// I do this mainly because of fun and for better understanding
// don't ever user this, the performance must be horrible!

// cons cells are what lists in lisp are made of
// they have a car (first) and a cdr (rest).
// car and cdr can be primitive values or other cons cells.
// cadr is the car of the cdr, caddr is the car of the cdr of the codr, and so on.
// use consP (predicate) to check if you are dealing with one.

cons = function(car, cdr) {
  // this if should be refactored later on
  if (!consP(this)) {
    return new cons(car, cdr);
  }

  this.car = car;
  this.cdr = cdr;
};

consP = function(list) {
  return (list instanceof cons);
};

car = function(list) {
  return ((consP(list)) ? list.car : false);
};

cdr = function(list) {
  return (consP(list) ? list.cdr : false);
};

cadr = function(list) {
  return ((consP(list) && cdr(list)) ? car(cdr(list)) : false);
};

cddr = function(list) {
  return ((consP(list) && consP(cdr(list))) ? cdr(cdr(list)) : false);
};

caddr = function(list) {
  return ((consP(list) && cdr(list) && cdr(cdr(list))) ? car(cdr(cdr(list))) : false);
};

// in functional programming there should be no sideeffects
// so 'if' should return a value instead of doing stuff.
// a lot of time we have to pass in functions though,
// because otherwise trueValue and falseValue would both be evaluated
// everytime (which results in some serious hot cpu!).
// we could either pass functions or just use ?: directly instead 

_if = function(expr, trueValue, falseValue) {
  var trueValueFunctionP = typeof trueValue === "function",
      falseValueFunctionP = typeof falseValue === "function";

  return expr ? 
    (trueValueFunctionP ?
      trueValue() :
      trueValue
    ) : 
    (falseValueFunctionP ?
      falseValue() :
      falseValue
    );
};

// loops often have sideeffects, use recursion instead
// a recursive function often 'eats' the list and is called listeater.
// also note that no var gets mutated (another principle of functional programming)

addR = function(list) {
  var aTemp = car(list),
      a = consP(aTemp) ? addR(cons(car(aTemp), cdr(aTemp))) : aTemp,
      b = cadr(list) || cdr(list),
      rest = caddr(list) || cddr(list);

  return (typeof a === "number" && typeof b === "number") ?
    (rest ?
      (consP(rest) ?
        a + addR(b, cadr(list)) :
        a + b + rest
      ) :
      a + b
    ) :
    false;
};
