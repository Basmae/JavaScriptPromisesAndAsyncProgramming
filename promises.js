function timeout()
{
    const wait = new Promise((resolve)=>{
        setTimeout(() => {
            resolve("timeout function resolved");
        }, 1000);
    });
    wait.then((text)=>{
        console.log(text);
    });
}

timeout(); // timeout function resolved

// return a promise from the function

function timeout2()
{
    const wait = new Promise((resolve)=>{
        setTimeout(() => {
            resolve("timeout2 function resolved");
        }, 1000);
    });
    return wait;
}

timeout2().then((text)=>{
    console.log(text);
});

/*
function interval()
{
    let counter = 0;
    const wait = new Promise((resolve)=>{
        setInterval(() => {
            resolve(`interval function resolved ${++counter}`);
        }, 1000);
    });
    wait.then((text)=>{
        console.log(text);
    });
}

interval(); // interval function resolved 1 and the loop doesn't end
*/

// using finally

function intervalwithfinally()
{
    let interval;
    let counter = 0;
    const wait = new Promise((resolve)=>{
        interval = setInterval(() => {
            resolve(`interval with finally function resolved ${++counter}`);
        }, 1000);
    });
    wait.then((text)=>{
        console.log(text);
    }).finally(()=>{
        clearInterval(interval);
    });
}

intervalwithfinally(); // interval function resolved 1

// promise with reject

function xhr()
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let url = 'http://localhost:44387/books';
    const promise = new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.onload = ()=>
    {
        if(xhr.status === 200)
            resolve("xhr promise is resolved");
        else
           reject("xhr promise is rejected"); 
    } 
    xhr.onerror = ()=> reject("xhr promise is rejected");
    xhr.send();
    });
    return promise;
}

xhr().then((text)=>{
    console.log(text);
}).catch((error)=>{
    console.log(error);
}); //xhr promise is rejected

// waiting for all promises to resolve

function allPromises()
{
    let timeoutPromise = timeout2();
    let xhrPromise = xhr();
    Promise.all([timeoutPromise, xhrPromise]).then(([timeout,xhr])=>{
        console.log("All Promises resolved: ",timeout.data,"  ",xhr.data);
    }).catch((error)=>{
        console.log("there is error in promises: ",error);
    });
}

allPromises();

