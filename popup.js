// Getting selected text
// https://stackoverflow.com/questions/20607108/cant-return-selected-text-on-chrome-extension

/* The function that finds and returns the selected text */
//var funcToInject = function() {
//    var selection = window.getSelection();
//    return (selection.rangeCount > 0) ? selection.toString() : '';
//};

function log (text) {
  chrome.extension.getBackgroundPage().console.log(text)
}

function renderStatus (statusText) {
	  document.getElementById('status').textContent = statusText;
}


log("Executing popup script");

// Render current wordlist
chrome.storage.local.get("list",function(value){renderStatus(value.list)});


function clear() {
  chrome.storage.local.set({"list":""},function(){log("Cleared local storage")});
  chrome.storage.local.get("list",function(value){renderStatus(value.list)});
}

function save() {
  chrome.storage.local.set({"list":document.getElementById('status').value},function(){
    log("Modification to list is saved to local storage");
  });
}

function copy() {
  log('Copying text command was ' + msg);
  document.getElementById('status').select();
  var successful = document.execCommand('copy');
  var msg = successful ? 'successful' : 'unsuccessful';
  log('Copying text command was ' + msg);
}

document.getElementById('clearbtt').addEventListener('click', clear);

document.getElementById('savebtt').addEventListener('click', save);

document.getElementById('copybtt').addEventListener('click', copy);


document.addEventListener('DOMContentLoaded', function() {
	 //  renderStatus('Performing Google Image search for ');

});

/* This line converts the above function to string
 * (and makes sure it will be called instantly) */
