var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
     fetch(apiUrl).then(function(response) {
         response.json().then(function(data) {
             console.log(data);
         })
     })

console.log("outside");
};  




//variable to get the user form
var userFormEl = document.querySelector("#user-form");
//variable to get the input of the userform
var nameInputEl = document.querySelector("#username");




//function to recieve the information from the user form.. 
var formSubmitHandler = function(event) {
    event.preventDefault();
    
//variable stores the input of user form
    var username = nameInputEl.value.trim();

//if a username is entered, run the getUserRepos function with username value; reset the input element
    if (username) {
        getUserRepos(username)
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

//when the submit button is pressed the formSubmitHandler function runs
userFormEl.addEventListener("submit", formSubmitHandler);