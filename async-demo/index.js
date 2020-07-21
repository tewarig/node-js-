//sync call
console.log("Before........");

//calback hell

getUser(1, (user) => {
  console.log("User", user);
  //get repo
  getRepositories(user.getRepositories, (repo) => {
    console.log("Repo ", repo);
  });
});
console.log("After..........");

//Async call
console.log("Before.......");
const user = getUser(1);
// const repo = getRepositories(user.githubUserName);
console.log("After...........");

console.log("After.........");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Connecting to data base");
    callback({ id: id, githubUserName: "tewarig" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling github api.......");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
