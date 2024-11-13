import os, key
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

instructions = ""

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

def update_instructions(new_instructions):
    instructions = new_instructions
    

def exchange(message):
    return chat_session.send_message(message)


