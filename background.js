console.log("background script is executing")

chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
  if (command == "additem") {
     additem();
  }
});


function additem(){
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    console.log(selection[0]);
    chrome.storage.local.get("list",function(current){
      if (current.list == null) current.list = "";
      newlist = current.list.trim()+"\n"+ selection[0];
      chrome.storage.local.set({"list":newlist},function(){
        console.log("Added "+selection[0]);
      });
    });
  });
}
