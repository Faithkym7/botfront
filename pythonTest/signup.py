from bs4 import BeautifulSoup

def signup():
    # Path to the HTML file in your project directory
    html_file_path = "signup.html"

    # Read the HTML content
    with open(html_file_path, "r", encoding="utf-8") as html_file:
        html_content = html_file.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, "html.parser")

    # Extract the sign-up steps
    steps = []
    for step in soup.find_all("li"):
        steps.append(step.get_text())

    # Format the steps as a numbered list
    formatted_steps = "\n".join([f"{i + 1}. {step}" for i, step in enumerate(steps)])

    # Replace the following line with your response mechanism
    # For example, print the formatted steps
    
    return(f"Sure! Here are the sign-up steps:\n{formatted_steps}")



