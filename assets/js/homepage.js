//variable to get the user form
var userFormEl = document.querySelector("#user-form");
//variable to get the input of the userform
var nameInputEl = document.querySelector("#username");
//variable to get the container for repos
var repoContainerEl = document.querySelector("#repos-container");
//variable to get the span element that will house the search name
var repoSearchTerm = document.querySelector("#repo-search-term");



var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
     fetch(apiUrl).then(function(response) {
         //request was successful
        if (response.ok) { 
        response.json().then(function(data) {
             displayRepos(data, user)
         })
        } else {
            alert("Error: GitHub User Not Found");
        }
     })
     .catch(function(error) {
         //Notice this `.catch()` getting chained onto the end of the `.then()` method
         alert("Unable to connect to GitHub");
     })

console.log("outside");
};  


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


var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }



    //clear search results from repo container
    repoContainerEl.textContent = "";
    //clear search results from span 
    repoSearchTerm.textContent = searchTerm;

    
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        //append to container
        repoEl.appendChild(statusEl);

        //append to container
        repoEl.appendChild(titleEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    };
}