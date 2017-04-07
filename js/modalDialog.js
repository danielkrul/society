function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

var ModalDialog = function (params){
	for(var current in params) {
        switch(current) {
            case 'type':
                this.type = params[current];
                break;

            case 'title':
                this.title = params[current];
                break;

            case 'text':
                this.text = params[current];
                break;

            case 'buttons':
            	this.buttons = params[current];
            	break;
        }
    }
    var randomStringGenerated = randomString(20);
    var modalDialogShadow = document.createElement("div");
    modalDialogShadow.className = 'modalShadow modalDialogID' + randomStringGenerated;
    $('body').append(modalDialogShadow);

    this.modalElement = $('.modalDialogID' + randomStringGenerated);
    
    var modalDialog = document.createElement('div');
    modalDialog.className = 'modalDialog innerModalID' + randomStringGenerated;
    this.modalElement.append(modalDialog);

    var innerModal = $('.innerModalID' + randomStringGenerated);
    var buttonsStringsArray = {
    	'left': [],
    	'right': []
    };
    var buttonsRandomStrings = [];
    for (var i = 0; i < this.buttons.length; i++) {
    	buttonsRandomStrings.push(randomString(10));
    }

    for (var i = 0; i < this.buttons.length; i++) {
		if (this.buttons[i].align == 'left') {
			buttonsStringsArray.left.push('<a class="modalButtonClickID'+ buttonsRandomStrings[i] +'" href="#">'+ this.buttons[i].value +'</a>');
		}
		if (this.buttons[i].align == 'right') {
			buttonsStringsArray.right.push('<a class="modalButtonClickID'+ buttonsRandomStrings[i] +'" href="#">'+ this.buttons[i].value +'</a>');
		}
	}

    if(this.type == 'error'){
    	var errorModalDialog = document.createElement('div');
    	errorModalDialog.className = 'errorMessage errorMessageID' + randomStringGenerated;
    	innerModal.append(errorModalDialog);

    	var errorMessage = $('.errorMessageID' + randomStringGenerated);
    	errorMessage.html('\
			<div class="header">\
				<img src="design/icons/error-icon.png">\
			</div>\
			\
			<div class="title">\
				<h3>'+ this.title +'</h3>\
			</div>\
			<div class="text">\
				'+ this.text +'\
			</div>\
			<div class="buttons">\
				<div class="left">\
					'+ buttonsStringsArray.left.join(" ") +'\
				</div>\
				<div class="right">\
					'+ buttonsStringsArray.right.join(" ") +'\
				</div>\
			</div>\
    	');
    } else if(this.type == 'success'){
    	var successModalDialog = document.createElement('div');
    	successModalDialog.className = 'successMessage successMessageID' + randomStringGenerated;
    	innerModal.append(successModalDialog);

    	var successMessage = $('.successMessageID' + randomStringGenerated);
    	successMessage.html('\
			<div class="header">\
				<img src="design/icons/success-icon.png">\
			</div>\
			\
			<div class="title">\
				<h3>'+ this.title +'</h3>\
			</div>\
			<div class="text">\
				'+ this.text +'\
			</div>\
			<div class="buttons">\
				<div class="left">\
					'+ buttonsStringsArray.left.join(" ") +'\
				</div>\
				<div class="right">\
					'+ buttonsStringsArray.right.join(" ") +'\
				</div>\
			</div>\
    	');
    } else if(this.type == 'info'){
    	var infoModalDialog = document.createElement('div');
    	infoModalDialog.className = 'infoMessage infoMessageID' + randomStringGenerated;
    	innerModal.append(infoModalDialog);

    	var infoMessage = $('.infoMessageID' + randomStringGenerated);
    	infoMessage.html('\
			<div class="header">\
				<img src="design/icons/info-icon.png">\
			</div>\
			\
			<div class="title">\
				<h3>'+ this.title +'</h3>\
			</div>\
			<div class="text">\
				'+ this.text +'\
			</div>\
			<div class="buttons">\
				<div class="left">\
					'+ buttonsStringsArray.left.join(" ") +'\
				</div>\
				<div class="right">\
					'+ buttonsStringsArray.right.join(" ") +'\
				</div>\
			</div>\
    	');
    } else if(this.type == 'warning'){
    	var warningModalDialog = document.createElement('div');
    	warningModalDialog.className = 'warningMessage warningMessageID' + randomStringGenerated;
    	innerModal.append(warningModalDialog);

    	var warningMessage = $('.warningMessageID' + randomStringGenerated);
    	warningMessage.html('\
			<div class="header">\
				<img src="design/icons/warning-icon.png">\
			</div>\
			\
			<div class="title">\
				<h3>'+ this.title +'</h3>\
			</div>\
			<div class="text">\
				'+ this.text +'\
			</div>\
			<div class="buttons">\
				<div class="left">\
					'+ buttonsStringsArray.left.join(" ") +'\
				</div>\
				<div class="right">\
					'+ buttonsStringsArray.right.join(" ") +'\
				</div>\
			</div>\
    	');
    }
    var _this = this;
    for (var i = 0; i < this.buttons.length; i++) {
    	!function inner(i){
        	$('.modalButtonClickID' + buttonsRandomStrings[i]).click(function(){
    			_this.buttons[i].callback(_this);
    		});
    	}(i);
    }

    this.modalElement.fadeIn(1000);	
}

ModalDialog.prototype = {
	deleteModal: function(){
		var _this = this;
		this.modalElement.fadeOut(1000, function(){
			_this.modalElement.remove();
		});
		
	}
}
