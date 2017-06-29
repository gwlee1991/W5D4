Function.prototype.myBind = function (context) {
  return () => {
    this.apply(context);
  };
};

function f() {
  console.log(this.name);
}

class Lamp {
  constructor(name) {
    this.name = name;
  }
}
let lamp = new Lamp('lampy');

// let lamp = {
//   name: 'lampy'
// };

f();

f.myBind(lamp)();
