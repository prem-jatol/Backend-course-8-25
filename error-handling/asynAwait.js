
// async function fetchUser() {
//   try {
//     const result = await fetch('https://jsonplaceholder.typicode.com/users/1')
//     const responce = await result.json();
//     console.log("User:", responce);
//   } catch (err) {
//     console.log("API Error:", err.message);
//   }
// }

function fetchUser() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(
            (success) => {
                return success.json();
            }
        )
        .then(
            (success) => {
                console.log(success);
            }
        )
        .catch(
            (err) => {
                console.log(err.message);
            }
        )
}

fetchUser();

// then catch
