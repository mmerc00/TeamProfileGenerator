class Person {
  constructor(name) {
    this.name = name;
  }

  setName(val) {
    if (!val) {
      throw new Error("Cannot be null!");
    }
    this.name = val;
  }

  getName(key) {
    if (key !== 123) {
      throw new Error("Incorrect KEY");
    }
    return this.name;
  }
}

const Ben = new Person("Ben");
// Ben.name = "";
// Ben.setName("");

console.log(Ben.getName(123));

Ben.setName("Benjamin");

console.log(Ben.getName(12));
