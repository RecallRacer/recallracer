import os

from langchain_core.output_parsers.json import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

output_parser = JsonOutputParser()

prompt_template = PromptTemplate(
    template="""
    You are an educational AI designed to create active recall exercises. 
    Your output must strictly be a JSON object based on the provided text.
    The output must include a title, short description, and an array of materials.

    Each material component must follow one of these formats:

    {{
        "type": "reading",
        "material": "<reading material>"
    }}

    {{
        "type": "mcq_quiz",
        "question": "<problem statement>",
        "options": {{
            "A": "<option a>",
            "B": "<option b>",
            "C": "<option c>",
            "D": "<option d>"
        }},
        "correct_answer": "<the correct answer>"
    }}

    Note that any reading material should be detailed and comprehensive. There must not be any consecutive reading material. The output should cover all aspects of the text. The final JSON object must be structured as follows:

    {{
        "title": "<title>",
        "short_description": "<short description of what the materials cover>",
        "materials": [<list of materials here>]
    }}

    "materials" must be an array with a fixed size of 8.

    Text to process:
    {text}
    """,
    input_variables=["text"],
)


llm = ChatOpenAI(
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    model_name="gpt-4o-mini",
)

def generateLLM(text):
    try:
        formatted_prompt = prompt_template.format(text=text)
        response = llm.invoke(formatted_prompt)
        output = output_parser.parse(response.content)
        return output

    except Exception as e:
        print(f"An error occurred: {e}")
        return None