import os, key
import google.generativeai as genai
import meals

genai.configure(api_key=os.environ["bot_key"])


    
instructions = ""

def update_instructions(new_instructions):
    global instructions
    instructions = new_instructions
    
meals.set_instructions()

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction = instructions,
)

chat_session = model.start_chat(
  history=[
  ]
)

def exchange(message):
    return chat_session.send_message(message).text


