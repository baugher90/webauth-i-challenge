
exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        { username: "admin", password: "$2a$08$DCzCPsBpjDGszNAxHopsmeLWqFKYfKDWGMxQkAjWHHW7Mrq2n0qqm" }
      ]);
    });
};
