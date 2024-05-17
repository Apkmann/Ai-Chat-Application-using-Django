import google.generativeai as ai
import os
from dotenv import load_dotenv,find_dotenv

_ = load_dotenv(find_dotenv())
if _:
    ai.configure(

    api_key = os.environ["api_key"]

    )  
else:
    raise "API KEY Not Found!"

instruction = "Your output format must be in HTML tags (for headings use H3 tag, for subheadings use H5 tag or H4 tag, for paragraphs or contents use p tag, also use inline css but don't use color and don't include html name). Coding part: (If you asked about code or coding problems, you need to provide a more structured way until You provided with input related to code) Because you are a general purpose assistant"
model = ai.GenerativeModel(model_name='gemini-1.5-pro-latest',
                           system_instruction=instruction)
messages=[] #It stores all the conversation
response = ""
def GetResponse(message):
    global response
    try:
        if messages==[]:
            messages.append({'role':'user','parts':[message]})
            response = model.generate_content(messages).text
            return response
        else:
            if response!=None:
                messages.append({'role':'model','parts':[response]})
                messages.append({'role':'user','parts':[message]})
                response = model.generate_content(messages).text
                return response
            else:
                return "An Error Occured"
    except Exception as e:
        return "<h3 style='color:red;'>An Error Occured: "+str(e)+"</h3>" #If a Error Occurs It sends the response as html tag it doesn't stored in memory the conversation will be stopped



