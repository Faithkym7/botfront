import React, { useRef, useState, useEffect } from 'react';
import './chat.css';
/*import Message from './Message';*/
/*import showdown from 'showdown';*/
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { AiOutlineRobot, AiOutlineUser } from 'react-icons/ai';

const Chatbot = () => {
  
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState(null);   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chats] = useState([]);
  const inputBox = useRef(null);

    // Scroll to the bottom when the component mounts
    // useEffect(() => {
    //   inputForm.current.submit();
    // }, [inputBox]);

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        // inputForm.current.submit();
      }
      
    }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userMessage = {
      text: userInput,
      sender: 'user', 
    }; 

    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:5002/test',
        userMessage,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
        
        const data = response.data;
        setData([...chats, data.message]); 
        
        chats.unshift(userMessage);  
        chats.unshift(data.message);
        setUserInput('')
        inputBox.current.focus();
      
      // const input = userMessage.input;
      // setInput(input);

    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='chatbot'>
      {/* Message history */}
      
      <div className='msg'>
        
          <div className='msg-wrapper' style={{overflow: 'auto', display: 'flex', flexDirection:'column-reverse'}}>

            
              <div className='output' style={{display: 'flex', flexDirection: 'column-reverse', overflow:'auto'}}>
                {/* <div className='right'>{userInput} {<FaUser />}</div>
                <div className='left'>{<AiOutlineRobot />} {data?.message}</div>
                 */}

                 {chats?.map((text, index) => (
                  <div key={index}>
                  {text.sender ?
                    <div style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                      <div style={{display:'flex', justifySelf:'center', padding: '0.8rem', borderRadius: '5px', backgroundColor:"#0000ff30", justifyContent: 'end', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', width: 'max-content', maxWidth: '80%', boxSizing: 'border-box'}}>
                        <p style={{fontSize:'0.7rem', padding: 0, margin: 0}}>{text.text}</p> <AiOutlineUser fontSize={20} style={{color:"blue"}}/>
                      </div>
                    </div>   :
                      <div style={{display: 'flex', boxSizing: "border-box", padding: '0.8rem', borderRadius: '5px', backgroundColor:"#f0f0f8", fontSize:'0.7rem', alignItems: 'start', gap:'0.3rem', width: 'max-content', maxWidth:'80%'}}>
                        <AiOutlineRobot style={{ flexShrink:0, color: "maroon" }} fontSize={20}/> <p style={{fontSize: '0.7rem', padding: 0, margin: 0}}>{text}</p>
                      </div>
                  }
                  </div>
                 ))
                 }
              </div>           
            
             
           
          </div>
        
      </div>

      {/* User input form */}
      <form className='Form' onSubmit={handleSubmit}>
        {/* Display the user's input */}       

        <input
          className='Input'
          type='text'
          ref={inputBox}
          onKeyDown={handleKeyPress}
          style={{resize: 'none'}}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='Type here...'
        ></input>
        <button className='button' type='submit'>
          Send
        </button>
      </form>

      {/* Loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Chatbot;
