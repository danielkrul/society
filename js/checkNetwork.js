function ping(_url, _callback) {
	var i = new Image();
	var state = 'Kree';

	i.onload = function() {
		_callback(true);
	}
	i.onerror = function() {
		_callback(false);
	}
	i.src = _url;
}

var CheckNetwork = function(params){
	for(var current in params) {
        switch(current) {
            case 'url':
                this.url = params[current];
                break;

            case 'setInterval':
            	this.setInterval = params[current];
            	break;

            case 'cache':
            	this.cache = params[current];
            	break;
        }
    }
    var _this = this;
    var mainTimeout;

    (function call(){
    	if(_this.cache == false){
    		ping(_this.url + '?d=' + escape(Date()), function(e){
        		localStorage.setItem('networkWorking', e);
        		mainTimeout = setTimeout(call, _this.setInterval);
        	});  
    	} else {
    		ping(_this.url, function(e){
        		localStorage.setItem('networkWorking', e);
        		mainTimeout = setTimeout(call, _this.setInterval);
        	});
    	}   
    })();
}

CheckNetwork.prototype = {
	isNetwork: function(){
		return localStorage.getItem('networkWorking');
	}
};