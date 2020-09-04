const assert = require("assert");
const User = require("../src/user");
const { doesNotMatch } = require("assert");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });
    joe = new User({ name: "Joe" });

    // joe.save().then(() => done());
    Promise.all([alex.save(), maria.save(), joe.save(), joe.save()]).then(() =>
      done()
    );
  });

  it("finds all users with a name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe.id.toString());
      done();
    });
  });

  it("find the user with particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });

  it("can skip and limit the result set", (done) => {
    // -Alex - [Joe Maria] - Zach
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1]).name === "Maria";
        done();
      });
  });
});
