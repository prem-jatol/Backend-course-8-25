// function fetchData(callback) {
//   const error = true; // simulate error = true to test error
//   if (error) {
//     callback("Something went wrong", null);
//   } else {
//     callback(null, "Data fetched successfully");
//   }
// }

// fetchData((err, result) => {
//   if (err) {
//     console.log("Error:", err);
//   } else {
//     console.log("Result:", result);
//   }
// });

function myFunction(callback){
    // console.log("my function calling...");
    callback("callback functin calling")
}

myFunction(
    (result)=>{
        console.log(result);
    }
);

// function myfunction2(fun){
//     console.log(fun, " funcion calling");
// }

// myfunction2("second")


// when we call a function inside a another function as a perameter
// callback give result as promise