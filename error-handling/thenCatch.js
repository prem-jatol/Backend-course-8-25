function fetchData(){
    return new Promise(
        (resolve, reject)=>{
            const err = false;
            if(err){
                reject("error to fetch data")
            }else{
                resolve("data fetched")
            }
        }
    )
}


fetchData()
.then(
    (success)=>{
        console.log(success);
        return "second condition logic"
    }
)
.then(
    (success)=>{
        console.log(success);
    }
)
.catch(
    (err)=>{
        console.log(err);  
    }
)