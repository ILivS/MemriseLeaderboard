
var rank=0;
var mainUser="ポニョ";

 var temp;
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
   chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    var username="";
        switch(message.type) {
           
          case "getCookies":
          chrome.cookies.getAll({domain: "memrise.com",name: "sessionid_2"}, function(cookies) {
            console.log('Callback for cookies came in fine.');
            console.log(cookies[0].value);   
            sendResponse({
                response: cookies[0].value
            });   
          
             
              });

          break;
            case "rankDown":
           
            rank= message.response;
            username=message.user;
            var notiDown={
                type:'basic',
                iconUrl:'ms.png',
                title:'Rank',
                message:   "You has been kicked ass by   "+username + ". Ranking : "+ rank
              };
              chrome.notifications.create(makeid(),notiDown);
              case "rankUp":
           
              rank= message.response;
              username=message.user;
              var notiUp={
                  type:'basic',
                  iconUrl:'ms.png',
                  title:'Rank',
                  message:   "Bạn đã vượt mặt  "+username + ". Ranking : "+ rank
                };
                chrome.notifications.create(makeid(),notiUp);
            break;
            case "rankNoti" :
            rank= message.response;
          
            break;
            case "setResponse":
             temp = message.response;
            break;
            case "getResponse":
            sendResponse(temp);
                    break;
                default:
                console.error("Unrecognised message: ", message);
        }
        return true;
    }
);






      