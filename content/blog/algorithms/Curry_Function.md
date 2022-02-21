# Curry Function

Currying is a process in functional programming in which we can transform a function with multiple arguments into a sequence of nesting functions. It returns a new function that expects the next argument inline.

```
function multiply(a) {
    return (b) => {
        return (c) => {
            return a * b * c
        }
    }
}
log(multiply(1)(2)(3)) // 6
```



```
function curry(fn, ...args) {
    return (..._arg) => {
        return fn(...args, ..._arg);
    }
}
```

```
function discount(discount) {
    return (price) => {
        return price * discount;
    }
}
const tenPercentDiscount = discount(0.1);
tenPercentDiscount(500); // $50
// $500 - $50 = $450

const twentyPercentDiscount = discount(0.2);

twentyPercentDiscount(500); // 100
// $500 - $100 = $400
```

