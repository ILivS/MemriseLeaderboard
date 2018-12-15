 console.log("content loaded");

 getCookies();
 function getCookies()
 {
  
  chrome.runtime.sendMessage( {type:"getCookies"}, function(response){
  
 
   if(response.response!=null && response.response!=undefined)
   chrome.storage.sync.set({cookies: response.response}, function() {
    console.log("Updated cookies : " + response.response );
  });  
  chrome.storage.sync.set({cookies: response.response}, function() {
    console.log("Updated cookies : " + response.response );
  });  
  
 });
               
              
 }
getData();
setInterval(function(){getData(); }, 300000);
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) { 
  if (message.type=="refresh")
  {
    getData();
    
  }
  
     
});
function getData()
{
  var  rank=0;
  var mainUser="ポニョ";
  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
 var url = "https://memriseboard.herokuapp.com/api";
 
 doCORSRequest();
 function doCORSRequest(options, printResult) {
   var x = new XMLHttpRequest();
   x.open('POST', cors_api_url + url);
  // x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  x.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
   x.onload = x.onerror = function() {
    var obj = JSON.parse(x.responseText);
    var responseText="";

  for (let i=0;i<100;i++)
    {
        if (obj.rows[i]!=undefined) 
        if (obj.rows[i].username==mainUser) 
        {
          rank=obj.rows[i].position; 
          
          chrome.runtime.sendMessage({type: "rankNoti",response: rank});
          break;
        }
       }
       console.log("Update rank: " + rank);
       chrome.storage.sync.get(['No'], function(result) {
         var username="";
    
        if (rank-result.No==1 )
          chrome.runtime.sendMessage({type: "rankDown",response: rank,user: obj.rows[rank-2].username});
          else if (result.No-rank==1)
        
          chrome.runtime.sendMessage({type: "rankUp",response: rank,user:obj.rows[rank].username});
         
        else if (rank-result.No>1)
        {
        
          for (let i=0;i< (rank-1);i++)
          {
            if (i!= rank-2)
              username+=  obj.rows[i].username+", ";
              else  username+=  obj.rows[i].username;
          }
        chrome.runtime.sendMessage({type: "rankDown",response: rank,user:username});
        }
       
        
        chrome.storage.sync.set({No: rank}, function() {
          console.log("Updated position : " + rank );
        });  
});

    chrome.runtime.sendMessage({type: "setResponse",response: x.responseText});
   };
  
   chrome.storage.sync.get(['cookies'], function(result) {
    var data = JSON.stringify({"cookies": result.cookies});
    console.log(data);
    x.send(data);
   });
  }
 }












 


    
 