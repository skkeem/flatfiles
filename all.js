let a = Promise.resolve(1);
let b = Promise.resolve(2);
let c = Promise.resolve(3);

let d = Promise.all([a,b]);


Promise.all([d, c]).then(values => console.log(values));
