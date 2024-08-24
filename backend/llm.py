import os

from langchain_core.output_parsers.json import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

output_parser = JsonOutputParser()

prompt_template = PromptTemplate(
    template="""
    You are an educational AI designed to create active recall exercises. 
    Your output must strictly be a JSON array of components based on the provided text.
    Each component must follow one of these formats:

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

    {{
        "type": "open_ended_quiz",
        "question": "<problem statement>",
        "correct_answer": "<the correct answer>"
    }}

    Your output MUST be a valid JSON array that matches this format, and it should be structured in a particular order in hopes of maximizing active recall.
    Ensure all components are in the correct format.

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