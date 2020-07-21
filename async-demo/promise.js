const p = new Promise((resolve, reject) => {
  //kick off async work
  setTimeout(() => {
    reject(new Error("message"));
    //resolve(1);
  }, 2000);
});

p.then((result) => console.log("Result ", result)).catch((error) =>
  console.log("Error", error.message)
);
