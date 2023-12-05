import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  //password generator method usecallback is for optimization caching

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str += "!@#$%^&*-+={}[]~`"

    for (let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  //to run the passgenerator we use use effect hook
  useEffect (()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-700'>
        <h1 className='text-4xl text-center text-white py-3' >Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden py-2 px-2 mb-4'>
          <input type="text" value={password} className='outline-none w-full py-3 px-3 rounded' placeholder='password' readOnly ref={passwordRef}/>
          <button onClick={copyPassToClipboard} className='outline-none rounded bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
