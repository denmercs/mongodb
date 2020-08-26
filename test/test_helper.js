const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => done())
    .on("error", (error) => console.warn("Error", error));
});

// beforeEach is a hook
// goal is to empty the database and then run the next command
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
