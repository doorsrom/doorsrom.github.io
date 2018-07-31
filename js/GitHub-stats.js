jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.githubRepoContributors = function(username, repo, callback) {
   jQuery.getJSON('https://api.github.com/repos/'+username+'/'+repo+'/contributors'+'?callback=?',callback)
}

jQuery.githubOrgMembers = function(org,callback){
   jQuery.getJSON('https://api.github.com/orgs/' + org + '/public_members?callback=?',callback)
}

jQuery.githubRepoUpdateDate = function(username, repo, callback) {
   jQuery.getJSON('https://api.github.com/repos/'+username+'/'+repo+'?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com') && this.name != (username.toLowerCase()+'.github.io')) {
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em>: ' + this.description + '</dt>');
            }
        });      
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};

jQuery.fn.loadContributors = function(user,repo){
	var target = this;
	$.githubRepoContributors(user,repo,function(data){
		var contributorHTML = "";
		var contributors = data.data;
		$(contributors).each(function(){
			contributorHTML += "<a href='" + this.html_url + "'><img style='width:40px;padding:0px;margin:5px 5px 0px 0px;vertical-align:middle;border-radius:6px;' src='" + this.avatar_url + "' title='" + this.login + "'></a>";
		});
		target.html(contributorHTML);
	});
};

jQuery.fn.loadOrgMembers = function(org){
        var target = this;
        $.githubOrgMembers(org,function(data){
                var memberHTML = "";
		var members = data.data;
                $(members).each(function(){
                        memberHTML += "<a href='" + this.html_url + "'><img style='width:40px;padding:0px;margin:5px 5px 0px 0px;vertical-align:middle;border-radius:6px;' src='" + this.avatar_url + "' title='" + this.login + "'></a>";
                });
                target.html(memberHTML);
        });
};

jQuery.fn.loadRepoUpdateDate = function(user,repo){
        var target = this;
        $.githubRepoUpdateDate(user,repo,function(data){
                var dateHTML = "";
                var data = data.data;
                dateHTML += "<p class='repo-owner'>" + data.updated_at.replace("T", " ").replace("Z","") + "</p>";
                target.html(dateHTML);
        });
};