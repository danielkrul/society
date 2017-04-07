var init = function() {
	var checkNetwork = new CheckNetwork({
		'url': 'http://msdilna.cz/test.png',
		'setInterval': 500,
		'cache': false
	});

	var offlineModalDialog = 0, isOfflineModalDialogOpen = false;

	var checkNetworkInterval = window.setInterval(function(){
		if (checkNetwork.isNetwork() == 'true') {
			if (offlineModalDialog !== 0) {
				offlineModalDialog.deleteModal();
				isOfflineModalDialogOpen = false;
			}
		} else if(checkNetwork.isNetwork() == 'false') {
			if (isOfflineModalDialogOpen == false) {
				offlineModalDialog = new ModalDialog({
					'type': 'warning',
					'title': 'Připojení vypnuto',
					'text': 'Zkontrolujte připojení k Internetu.',
					'buttons': [
					{
						'value': 'Offline režim',
						'callback': function(e){
							console.log('jaffa!');
						},
						'align': 'right'
					}]
				});

				isOfflineModalDialogOpen = true;
			}
		}
	}, 500);

	var loadingCircles = $('.circle');
	var index = 0;

	var loadingTimer = window.setInterval(function() {
		loadingCircles.css({
			'background': 'none'
		});
		loadingCircles.eq(index).css({
			'background': '#1F3A93'
		});

		if (index == 3) {
			index = -1;
		}
		index++;
	}, 700);

	function newTimeout(){
		if (checkNetwork.isNetwork() == 'false') {
			mainTimeout = window.setTimeout(newTimeout, 2000);
		} else {
			clearInterval(loadingTimer);
			if (localStorage.getItem('intro') === null) {
            	localStorage.setItem('intro', '0');
            } else {
            	localStorage.setItem('intro', '1');
            }

            if(localStorage.getItem('intro') == '0'){
				window.location.href = 'introPage.html';
			} else if(localStorage.getItem('intro') == '1'){
				window.location.href = 'loginPage.html';
			}
		}
	}

	var mainTimeout = window.setTimeout(newTimeout, 5000);
}
var initApp = new CordovaApp({
	'autoConsole': true,
	'callback': init
});