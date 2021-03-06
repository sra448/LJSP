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

  this.car = car || null;
  this.cdr = cdr || null;
};

consP = function(list) {
  return (list instanceof cons);
};

car = function(list) {
  return ((consP(list)) ? list.car : null);
};

cdr = function(list) {
  return (consP(list) ? list.cdr : null);
};

cadr = function(list) {
  return ((consP(list) && cdr(list)) ? car(cdr(list)) : null);
};

cddr = function(list) {
  return ((consP(list) && consP(cdr(list))) ? cdr(cdr(list)) : null);
};

caddr = function(list) {
  return ((consP(list) && cdr(list) && cdr(cdr(list))) ? car(cdr(cdr(list))) : null);
};

// a list is really only syntax sugar on top of cons cells
// (list("1 2 3")) is equal to (cons(1, (const(2, 3)))

list = function(str, isInner) {
  var listString = str.trim().replace(',', ' ').replace(/\'/g, '"'),
      listStr = !isInner && /^\(.*\)$/.test(listString) ?
        getContentInBrackets(listString) :
        listString,
      subListStr = getContentInBrackets(listStr),
      firstValue = /^\(/.test(listStr) ?
        list(subListStr, true) :
        listStr.match(/^([^\(\ ]+)/)[1],
      removeCurrentItemRegex = new RegExp('^' + (consP(firstValue) ? '(' + subListStr + ')' : firstValue) + '\ '),
      rest = listStr.split(removeCurrentItemRegex)[1];

  return cons((consP(firstValue) ? firstValue : JSON.parse(firstValue)), !isEmpty(rest) ? list(rest, true) : null);
};

// our print function will make testing way more easy
// it simply turns lists into stringrepresentations of given list

_print = function(lst, noBrackets) {
  return (noBrackets ? '' : '(') + (consP(lst) ?
    consP(car(lst)) && consP(cdr(lst)) ?
      _print(car(lst)) + " " + _print(cdr(lst), true) :
      consP(car(lst)) ?
        _print(car(lst)) + (JSON.stringify(cdr(lst)) !== null ? " . " + JSON.stringify(cdr(lst)) : "") :
        consP(cdr(lst)) ?
          JSON.stringify(car(lst)) + " " + _print(cdr(lst), true) :
          JSON.stringify(car(lst)) + (cdr(lst) !== null ? " . " + JSON.stringify(cdr(lst)) : "") :
    "") + (noBrackets ? '' : ')');
};

// map accepts a function and a list to apply the function to
// the function is the first argument, because we can use to ditch the list (later)

_map = function(fn, lst) {
  var carTemp = car(lst),
      first = (consP(carTemp) ? _map(fn, carTemp) : carTemp),
      rest = cdr(lst);

  return (consP(rest) ?
    (cons(fn(first), _map(fn, rest))) :
    (cons(fn(first), (rest !== null ? fn(rest) : null)))
  );
};

// the reduce function takes a list and assembles one single value out of it,
// given a function and a starting value. the function will be called once
// for every item in the list, with the return value of the last call (with
// the last item) as the first param (mem) and the actual item as the second

_reduce = function(fn, lst, startValue) {
  var carTemp = car(lst),
      mem = consP(carTemp) ?
        _reduce(fn, carTemp, startValue) :
        fn(startValue || 0, carTemp),
      rest = cdr(lst);

  return (consP(rest) ?
    _reduce(fn, rest, mem) :
    mem);
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
