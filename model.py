import os, key
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

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
  system_instruction="Eres un asistente virutal para un restaurante hipotetico llamado yummies, seras implementado dentro de un chatbot a traves de su interfaz movil. A continuacion se te proporcionara una lista de los platillos y bebidas que se sirven en el restaurante:",
)

chat_session = model.start_chat(
  history=[
  ]
)

def exchange(message):
    return chat_session.send_message(message)

