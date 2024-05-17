from django.shortcuts import render
from django.http import JsonResponse
from Chatapp.AIModel import GetResponse,messages #importing Ai model and messages list
from .models import ChatMessages #importing models
import google.generativeai as ai #importing Google generative module
import os
from dotenv import load_dotenv,find_dotenv #For Retriving Apikey from .env


unique_id = 0 # This is to Store the chat id and unique id globally

#This Function is to Generate the title for the conversation History
def Generate_title(conversation):
    #Instructions for the model to Generate Title
    instruction = "You are a title Generator. You will be given a conversation for which you must submit a two or three-word title. There shouldn't be more than three words in the title. Additionally, disregard the html tags."
    try:
        _ = load_dotenv(find_dotenv())
        if _:
            ai.configure(

            api_key = os.environ["api_key"] # Retriving the Api Key

            )  
        else:
            raise "API KEY Not Found!" # Handling the Error

        model = ai.GenerativeModel(model_name='gemini-1.5-pro-latest',
                                   system_instruction=instruction)   #Initialzing Google Ai Model
        title = model.generate_content(conversation).text
        return title # return the Title
    except:
        return "An Error Occured"

#This Function is to Generate the random prompts for the example
def Generate_prompt():
    #Instructions for the model to Generate Prompts
    instruction = "You are a Prompt Generator. You will be given a input like 'Give example prompts' You need to give a 10 words random prompt in this json format {'1':'a random prompt','2':'a random prompt','3':'a random prompt','4':'a random prompt'} as only 4 prompts for text generation about life hacks,coding,etc... but don't give output like this ```json {}``` only give the dictionary format"
    try:
        _ = load_dotenv(find_dotenv())
        if _:
            ai.configure(

            api_key = os.environ["api_key"]

            )  
        else:
            raise "API KEY Not Found!"

        model = ai.GenerativeModel(model_name='gemini-1.5-pro-latest',
                                   system_instruction=instruction)
        prompt = model.generate_content('Give example prompts').text
        return prompt # return the Prompts
    except:
        return "An Error Occured"
    
#Home page
def ChatPage(request):
    messages.clear() #If We click a newchat or reload then the previous conversation will be deleted beacause this is the list where the conversations are stored and given to the Ai model.It is imported from 'AIModel.py' module
    global unique_id,prompt #Globally Declared for Modifying the uniqued id and prompt
    try:
        is_last = ChatMessages.objects.last() #it will return the last appended object

        unique_id = is_last.chat_id+1 if is_last else unique_id+1 #For Generating new specific Chat id it uses the last appended chat's chat id to Generate the unique chat id 

        chatids = ChatMessages.objects.all() #It will return the all objects that stored in the memory

        prompts = eval(Generate_prompt()) #It will return the json format as string by using eval() method we can convert it to Python's dictionary data type 
    except:
        return render(request,"Errorpage.html") #If the Ai response is in a wrong format it will redirects to error page
    
    return render(request,"index.html",{"chatids":chatids,"prompts":prompts}) #For a Successfull response it will send the data to template

#This Function Responsible for recieving user input from javascript and sending the response to javascript also stores the coversation in models
def ResponseResult(request):
    global unique_id
    if request.method=="POST":
        message = request.POST.get("message",None) #It recieves the user input
        if message:
            response = GetResponse(message)
            try:
                if "An Error Occured" not in response: #handles the error for wrong response
                    chat = ChatMessages.objects.get(chat_id=unique_id)
                    chat.conversations.append({'role':'user','parts':[message]})
                    chat.conversations.append({'role':'model','parts':[response]})
                    chat.save()
            except ChatMessages.DoesNotExist: #if the chat id is not present in database then it will create a new one (it is responsible for creating new chat)
                if "An Error Occured" not in response:
                    conversation = [f"me: {message};You: {response}"]
                    title_response = Generate_title(conversation) #It will return the Title for the conversation

                    if "Error" not in title_response:
                        chat = ChatMessages.objects.create(title=title_response,chat_id=unique_id,conversations=[{'role':'user','parts':[message]},{'role':'model','parts':[response]}]) #it creates new object by setting all parameters
                        return JsonResponse({'response':response,'chatdata':{'title':chat.title,'chaid':chat.chat_id}}) #It sends the jsonresponse for the api call to javascript
                    
                    else:
                        return JsonResponse({'response':"An Error Occured"})
                
            return JsonResponse({'response':response})
        else:
            return JsonResponse({"response":"false"})
    else:
        return JsonResponse({"response":"false"})

#This Function is Responsible for retriving Previous Conversations   
def Conversation_History(request,chatid):
    messages.clear() #If we click one of the previous chat it will clear the current conversation.It is imported from 'AIModel.py' module
    global unique_id
    unique_id = chatid #It sets the recieved chat id of previous chat to global unique_id variable 
    chat = ChatMessages.objects.get(chat_id=chatid) #It retrives the previous conversation by using the recived chat id
    for i in chat.conversations:
        messages.append(i)      #Then the retrived conversation is again appended in messages list
    return JsonResponse({'chats':chat.conversations})  #Finally it sends to javascript



