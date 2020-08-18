const mongoose = require("mongoose");
const { deleteOne } = require("../src/user");

mongoose.connect("mongodb://localhost/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("Good to go!"))
  .on("error", (error) => console.warn("Error", error));

// beforeEach is a hook
// goal is to empty the database and then run the next command
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the next test!
    done();
  });
});
