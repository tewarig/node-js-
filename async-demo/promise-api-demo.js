const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async1..........");
  }, 2000);
  reject(new Error("Beacuse something failed...."));
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async2..........");
  }, 2000);
  resolve(2);
});
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async2..........");
  }, 2000);
  resolve(3);
});

// Promise.all([p1, p2, p3])
//   .then((result) => console.log(result))
//   .catch((err) => console.log("Error", err.message));
Promise.race([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));
