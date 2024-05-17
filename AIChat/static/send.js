let chat = document.getElementById("chatcontent");
let sidebar = document.getElementById("sidebar");
let messageinput = document.getElementById("msg");
let sendbutton = document.getElementById("send");
let sendbuttonp = document.getElementById("sendp");
let nohistory = document.getElementById("No_history");
let starttext = document.getElementById("starting");

function senddata()
{
    let messageinput = document.getElementById("msg");
    if(messageinput.value!="")
    {

    let token = document.cookie;
    let val = messageinput.value;
    starttext.style.display="none";
    chat.innerHTML+=`<h3>You: ${messageinput.value}</h3>`;
    sendbutton.disabled = true;
    messageinput.value="";

    fetch('/responseresult/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-CSRFToken': token.substring(10,token.length), 
    },
    body: "message="+encodeURIComponent(val),
})
  .then(response => response.json())
  .then(data => {

    chat.innerHTML+=`<h3>Ai: ${data.response}</h3>`;
    if('chatid' in data)
    {
      if(nohistory.innerText==="No History")
      sidebar.innerHTML="";

      sidebar.innerHTML+=`<button onclick='sendid(${data.chatid})'>${data.chatid}</button>`;

    }
    console.log('Success:', data.response);
    

  })
  .catch((error) => {

    console.error('Error:', error);
    
  });
}
}

function sendid(chatid)
{
  fetch(`/Conversation_History/${chatid}`)
  .then(response=>response.json())
  .then(data=>{
    chat.innerHTML="";
    data.chats.forEach(element => {
      
      if('user'===element.role)
      chat.innerHTML+=`<p>You: ${element.parts}</p>`;
      else
      chat.innerHTML+=`<p>Ai: ${element.parts}</p>`;

    });
  })
}

function showsidebar()
{
    let sidebar = document.getElementById("sidebar");
    sidebar.style.transform = "none";
}

function hidesidebar()
{
    let sidebar = document.getElementById("sidebar");
    sidebar.style.transform = "translateX(-380px)";
}

messageinput.addEventListener("focus",()=>{
    sendbutton.disabled = false;
        sendbuttonp.style.opacity = "1";
}) 

messageinput.addEventListener("focusout",()=>{
    sendbutton.disabled = true;
    sendbuttonp.style.opacity = "0.3";
}) 



