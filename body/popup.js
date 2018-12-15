/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"getResponse"}, function(response){
    
    });
});
*/

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type:"refresh"}, function(response){
     console.log("success");
  });
});

if (navigator.onLine)
{
  chrome.runtime.sendMessage({type:"getResponse"}, function(response) {
    var isConnecting=true;
      console.log(response);
      var myObj = JSON.parse(response);
      var txt="";
      txt += "<table border='1'>"
      txt +=   "<tr>" + 
      "<th>Position</th>" + 
      "<th>Name</th>"  + 
      "<th>Point</th>" 
    + "</tr>";
    
    for (let i=0;i<100;i++)
    {
        if (myObj==null) 
        {
   
           document.getElementById("demo").innerHTML = "Error!";
          isConnecting=false;
           break;
        }
        if (myObj.rows[i]!=undefined) 
        {
           txt += "<tr><td>" + myObj.rows[i].position + "</td>";
           txt += "<td>" + myObj.rows[i].username + "</td>";
            txt += "<td>" +myObj.rows[i].points + "</td></tr>";
        }
     
      }
      txt += "</table>" 
     if (isConnecting)  document.getElementById("demo").innerHTML = txt;
     });
   
   }
else {document.getElementById("demo").innerHTML = "No internet connection!"; }

   
