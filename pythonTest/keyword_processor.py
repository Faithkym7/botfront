from signup import signup

def process_user_input(input_text):
    signup_keywords = ["signup", "sign up"]
    greet_keywords = ["hey", "hi"]
    
    keyword_lists = [signup_keywords, greet_keywords]

    def check_keywords(input_text, keyword_lists):
        input_text = input_text.lower()

        for keyword_list in keyword_lists:
            for keyword in keyword_list:
                if keyword in input_text:
                    return keyword
        return None

    matched_keyword = check_keywords(input_text, keyword_lists)

    if matched_keyword:
        if matched_keyword in greet_keywords:
            return "hi, how are you"
        elif matched_keyword in signup_keywords:
            return signup()
    else:
        return "I have no data on that"
