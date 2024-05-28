
'use client';

import { tokenProvider } from '@/action/stream.action';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { channel } from 'diagnostics_channel';
import { useEffect, useRef, useState } from 'react';
 

 


export const Transcription = () => {
  const recognitionRef = useRef<SpeechRecognition>();
  

  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string[]>([]);
  //const [translation, setTranslation] = useState<string>('');

  //const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [language, setLanguage] = useState('en-US');

 // const availableVoices = voices?.filter(({ lang }) => lang === language);
 // const activeVoice = availableVoices?.find(({ name }) => name.includes('Google')) || availableVoices?.find(({ name }) => name.includes('Luciana')) || availableVoices?.[0];
  const {user , isLoaded} = useUser();

 


/*   useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    if (Array.isArray(voices) && voices.length > 0) {
      setVoices(voices);
      return;
    }
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function() {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
      };
    }
  }, []); */

  const handle_Click = () => {
    if (isActive) {
      recognitionRef.current?.stop();
      setIsActive(false);
      setText([]);
    //  setTranslation('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false; // Handle only final results
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = function() {
      setIsActive(true);
      setText([]);
     // setTranslation('');
    };

    recognitionRef.current.onend = function() {
      if (isActive) {
        setText([]);
       // setTranslation('');
        recognitionRef.current?.start();
      }
    };

    recognitionRef.current.onspeechstart = function() {
      setText([]);
     // setTranslation();
      console.log('Speech has been detected');
    };

    recognitionRef.current.onresult = async function(event) {

      if (event.results.length > 0) {
        const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript)
          setText(transcript)


       /*    try {
            const res = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, { q: transcript, target: language });
            const translationData = res.data.data.translations[0].translatedText;
            console.log('translationData', translationData);
            setTranslation(translationData);
            
             
           // speak(translationData)
          } 
          catch (error) {
            console.error('Error during translation:', error);
          } */

          setTimeout(() => {
            setText([]);
           // setTranslation('');
          }, 3000);
        
      }
    };

    recognitionRef.current.onerror = function(event) {
      console.error('Error occurred in recognition:', event.error);
    };

    recognitionRef.current.onnomatch = function() {
      console.log('No match found');
    };

    recognitionRef.current.start();
  };




/*   function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if ( activeVoice ) {
      window.speechSynthesis.cancel()
      utterance.voice = activeVoice;
    };
  
    window.speechSynthesis.speak(utterance);
  }  */

  return (
    <div>
     
      <p>{text.map((t)=>t)}</p>
      <Button onClick={handle_Click}>
        {isActive ? 'Stop Transcribing' : 'Start Transcribing'}
      </Button>
    </div>
  );
};








