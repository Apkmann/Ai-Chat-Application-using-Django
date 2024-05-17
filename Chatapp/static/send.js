//Getting the elements
let chat = document.getElementById("chatcontent");
let chats = document.getElementById("chatarea");
let sidebar = document.getElementById("innersidebar");
let messageinput = document.getElementById("msg");
let sendbutton = document.getElementById("send");
let sendbuttonp = document.getElementById("sendp");
let nohistory = document.getElementById("No_history");
let starttext = document.getElementById("starting");
let wholeexamples = document.getElementById("examples");
let example1 = document.getElementById("p1");
let example2 = document.getElementById("p2");
let example3 = document.getElementById("p3");
let example4 = document.getElementById("p4");

//Always scroll the chatarea div to bottom 
chats.scrollTop = chats.scrollHeight;

//It sends the user message and recieves data from django view
function senddata()
{
    if(messageinput.value!="")
    {

    let token = document.cookie; //Retrive the CSRF Token from cookie
    let val = messageinput.value;
    starttext.style.display="none";
    chat.style.display="block";
    wholeexamples.style.display = "none";
    chat.innerHTML+=`<p>You: ${messageinput.value}</p>`;
    sendbutton.disabled = true;
    sendbuttonp.style.opacity = "0.3";
    messageinput.value="";
    chats.scrollTop = chats.scrollHeight;

    //Fetch method uses for api call
    fetch('/responseresult/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-CSRFToken': token.substring(10,token.length), 
    },
    body: "message="+encodeURIComponent(val), //Sends the user message
})
  .then(response => response.json())
  .then(data => {
    sendbutton.disabled = false;
    sendbuttonp.style.opacity = "1";

    if((data.response.includes("An Error Occured"))===false) //For Handling Error If this false the retrived data will be shown in interface
    {
    chat.innerHTML+=`Ai: ${data.response}`;
    chats.scrollTop = chats.scrollHeight;
    if('chatdata' in data)
    {
      if(nohistory)
      sidebar.innerHTML="";

      sidebar.innerHTML+=`<button id="historychat" onclick='sendid(${data.chatdata.chatid})'>${data.chatdata.title}...</button>`;

      sidebar.scrollTop=-sidebar.scrollHeight;

    }
  }
  else
  {
    chat.innerHTML+=`<h3 style="color:red;">${data.response}</h3>`;
    sendbutton.disabled = true;
    sendbuttonp.style.opacity = "0.3";
  }
    

  })
  .catch((error) => {

    console.error('Error:', error);
    
  });
}
}


//It sends the chatid to django views
function sendid(chatid)
{
  fetch(`/Conversation_History/${chatid}`)
  .then(response=>response.json())
  .then(data=>{
    chat.innerHTML="";
    chat.style.display="block";
    data.chats.forEach(element => {
      
      if('user'===element.role)
      chat.innerHTML+=`<p>You: ${element.parts}</p>`;
      else
      chat.innerHTML+=`Ai: ${element.parts}`;
      chats.scrollTop = chats.scrollHeight;

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




example1.addEventListener('click',()=>{
  

  let token = document.cookie;
  let val = example1.innerText;
  starttext.style.display="none";
  chat.style.display="block";
  wholeexamples.style.display = "none";

  chat.innerHTML+=`<p>You: ${example1.innerText}</p>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
  chats.scrollTop = chats.scrollHeight;

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
  sendbutton.disabled = false;
  sendbuttonp.style.opacity = "1";

  if((data.response.includes("An Error Occured"))===false)
  {
  chat.innerHTML+=`Ai: ${data.response}`;
  chats.scrollTop = chats.scrollHeight;

  if('chatdata' in data)
  {
    if(nohistory)
    sidebar.innerHTML="";

    sidebar.innerHTML+=`<button id="historychat" onclick='sendid(${data.chatdata.chatid})'>${data.chatdata.title}...</button>`;

    sidebar.scrollTop=-sidebar.scrollHeight;

  }
}
  

else
{
  chat.innerHTML+=`<h3 style="color:red;">${data.response}</h3>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
}

})

});



example2.addEventListener('click',()=>{
  

  let token = document.cookie;
  let val = example2.innerText;
  starttext.style.display="none";
  chat.style.display="block";
  wholeexamples.style.display = "none";

  chat.innerHTML+=`<p>You: ${example2.innerText}</p>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
  chats.scrollTop = chats.scrollHeight;

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
  sendbutton.disabled = false;
  sendbuttonp.style.opacity = "1";

  if((data.response.includes("An Error Occured"))===false)
  {
  chat.innerHTML+=`Ai: ${data.response}`;
  chats.scrollTop = chats.scrollHeight;

  if('chatdata' in data)
  {
    if(nohistory)
    sidebar.innerHTML="";

    sidebar.innerHTML+=`<button id="historychat" onclick='sendid(${data.chatdata.chatid})'>${data.chatdata.title}...</button>`;

    sidebar.scrollTop=-sidebar.scrollHeight;

  }
}
  
else
{
  chat.innerHTML+=`<h3 style="color:red;">${data.response}</h3>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
}

})

});



example3.addEventListener('click',()=>{
  

  let token = document.cookie;
  let val = example3.innerText;
  starttext.style.display="none";
  chat.style.display="block";
  wholeexamples.style.display = "none";

  chat.innerHTML+=`<p>You: ${example3.innerText}</p>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
  chats.scrollTop = chats.scrollHeight;

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
  sendbutton.disabled = false;
  sendbuttonp.style.opacity = "1";

  if((data.response.includes("An Error Occured"))===false)
  {
  chat.innerHTML+=`Ai: ${data.response}`;
  chats.scrollTop = chats.scrollHeight;

  if('chatdata' in data)
  {
    if(nohistory)
    sidebar.innerHTML="";

    sidebar.innerHTML+=`<button id="historychat" onclick='sendid(${data.chatdata.chatid})'>${data.chatdata.title}...</button>`;

    sidebar.scrollTop=-sidebar.scrollHeight;

  }
}
  
else
{
  chat.innerHTML+=`<h3 style="color:red;">${data.response}</h3>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
}

})

});



example4.addEventListener('click',()=>{
  

  let token = document.cookie;
  let val = example4.innerText;
  starttext.style.display="none";
  chat.style.display="block";
  wholeexamples.style.display = "none";

  chat.innerHTML+=`<p>You: ${example4.innerText}</p>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
  chats.scrollTop = chats.scrollHeight;

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
  sendbutton.disabled = false;
  sendbuttonp.style.opacity = "1";

  if((data.response.includes("An Error Occured"))===false)
  {
    
  chat.innerHTML+=`Ai: ${data.response}`;
  chats.scrollTop = chats.scrollHeight;

  if('chatdata' in data)
  {
    if(nohistory)
    sidebar.innerHTML="";

    sidebar.innerHTML+=`<button id="historychat" onclick='sendid(${data.chatdata.chatid})'>${data.chatdata.title}...</button>`;

    sidebar.scrollTop=-sidebar.scrollHeight;

  }
}
  
else
{
  chat.innerHTML+=`<h3 style="color:red;">${data.response}</h3>`;
  sendbutton.disabled = true;
  sendbuttonp.style.opacity = "0.3";
}

})

});


function newchat()
{
  window.location.href="/";
}

sidebar.scrollTop=-sidebar.scrollHeight;