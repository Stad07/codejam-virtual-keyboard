"use strict";

window.onload = function() {
	let div = document.createElement('div');
	div.className = 'wrapper';

	document.body.append(div);
	
	let textarea = document.createElement('textarea');
	textarea.setAttribute('name', 'textarea');
	textarea.setAttribute('type', 'text');

	div.append(textarea);
	
	let keyboard = document.createElement('div');
	keyboard.className = 'keyboard flex_container';

	div.append(keyboard);	

	let buttons = [
		['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
		'Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','DEL',
		'CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','ENTER',
		'Shift','я','ч','с','м','и','т','ь','б','ю','.','&#9650;','Shift',
		'Ctrl','Win','Alt','Space','Alt','&#9668;','&#9660;','&#9658;','Ctrl'],

		['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
		'Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','DEL',
		'CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'ENTER',
		'Shift','z','x','c','v','b','n','m',',','.','/','&#9650;','Shift ',
		'Ctrl','Win','Alt','Space','Alt ','&#9668;','&#9660;','&#9658;','Ctrl ']
	];	
	
	function getKeyboard(cache) {

		let language = cache;

		function createKeyboard(arr) {
			for(let button of arr) {
				keyboard.insertAdjacentHTML("beforeend",`<span class="flex_element">${button}</span>`);
			}
			let blackButtons = [13,14,28,29,41,42,53,54,55,56,57,59,60,61,62,63];
	
			for(let item of blackButtons) {
				keyboard.childNodes[item].classList.add("black");
				if(item == 13 || item == 29 || item == 41 || item == 42 || item == 54) {
					keyboard.childNodes[item].classList.add("middle");
				}
				if(item == 57) {
					keyboard.childNodes[item].nextSibling.classList.add("long");
				}
				if(item != 13 && item != 41 && item != 53 && item != 60 && item != 61 && item != 62) {
					keyboard.childNodes[item].classList.add("special");
				}
				if(item == 41) {
					keyboard.childNodes[item].classList.add("enter");
				}
				if(item == 13) {
					keyboard.childNodes[item].classList.add("backspace");
				}			
			}
			return false;
		}
		return createKeyboard;
	}

	let createKeyboard = getKeyboard('rus');
	createKeyboard(buttons[0]);

	let span = document.getElementsByTagName('span');

	for(let i = 0; i < span.length; i++) {

		span[i].addEventListener('mousedown', function(e){			
			if(this.innerText == "Space") {
				this.style.backgroundColor = '#46978E';
				this.style.borderRadius = '20px';
				this.style.color = '#46978E';
			} else {
				this.style.backgroundColor = '#46978E';
				this.style.borderRadius = '20px';
				this.style.color = '#fff';
			}			
		});				
		
		span[i].addEventListener('mouseup', function(e){
			this.style.backgroundColor = '';
			this.style.borderRadius = '';
			this.style.color = '';			
					
			if(this.matches('.special')) {
				textarea.value += '';
				return false;
			}
		
			if(this.matches('.long')) {
				textarea.value += ' ';
				return false;				
			}
					
			if(this.matches('.enter')) {
				textarea.value += '\n';
				return false;				
			}
		
			if(this.matches('.backspace')) {
				let str = textarea.value.substr(0, (textarea.value.length - 1));
				textarea.value = str;	
				return false;							
			}					
		
			if(e.shiftKey) {
				textarea.value += this.innerText.toUpperCase();
			} else {
				textarea.value += this.innerText;
			} 						
		});				
	}

	document.addEventListener('keypress', function(e) {		
		if(e.keyCode == 13) {
			textarea.value += '\n';							
		} else {
			textarea.value += e.key;
		}
		return false;		
	});	
}         