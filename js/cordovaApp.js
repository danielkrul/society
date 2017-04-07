function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

var CordovaApp = function(params){
	for(var current in params) {
        switch(current) {
            case 'autoConsole':
                this.autoConsole = params[current];
                break;

            case 'callback':
            	this.callback = params[current];
            	break;

        }
    }

    this.appUniqueID = randomString(20);
    var tasksRunned = {
    	'autoConsole': false
    };

    this.autoConsoleRun = function(){
    	if(this.autoConsole == true){
    		var debugDiv = $('#debugDiv');

    		if (debugDiv.length == 0){
    			$('body').prepend('<div id="debugDiv"></div>');
    			debugDiv = $('#debugDiv');
    		}
    		console.log = function(message) {
    			$('#debugDiv').append('<p><strong>Log: </strong>' + message + '</p>');
    		};
    		console.error = console.debug = console.info = console.log

    		window.onerror = function ConsoleError(err, url, line) {
    			$('#debugDiv').append('<p style="background-color: darkred; color: white;">Line ' + line + ' : <b>' + err + '</b></p>');
    		}
    	}
    }
    var _this = this;
    
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    	document.addEventListener("deviceready", function() {
        	_this.autoConsoleRun();
        	_this.callback();
    	}, false);
	} else {
    	$(document).ready(function() {
    		//_this.autoConsoleRun();
        	try{
        		_this.callback();
        	} catch(err){
        		console.log(err);
        	}
    	});
	}
    
};

CordovaApp.prototype = {
	/*blockThread: function(time){
		var currentTime = new Date().getTime();

		while (currentTime + time >= new Date().getTime()) {}
	}*/
}