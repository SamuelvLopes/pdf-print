console.log(module.exports === this);
console.log(module.exports  === exports);
this = {

}

console.log(module.exports === this);
console.log(module.exports  === exports,module.exports);

