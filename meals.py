import requests
import model

response = None
meals_resume = []

def abc_str():

    abc = "abcdefghijklmnopqrstuvwxyz"

    for letter in abc:
        get_meals(letter)

        
def get_meals(letter):

    response = requests.get("https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter)
    meals = response.json()["meals"]

    if not meals:
        return None

    for meal in meals:

        meals_resume.append(

            { 
                "nombre": meal["strMeal"],
                "categoria": meal["strCategory"]
            }
        ) 
 
    
def set_instructions():

    instructions = "Eres un asistente virtual para un restaurante hipotetico llamado yummies, seras implementado dentro de un chatbot a traves de su interfaz movil. A continuacion se te proporcionara una lista de los platillos y bebidas que se sirven en el restaurante: \n"
    abc_str()

    for meal in meals_resume:
        entry = "Nombre del platillo: " + meal["nombre"] + ", Categoría" + meal["categoria"] + ".\n" 
        
        instructions += entry

    model.update_instructions(instructions)
