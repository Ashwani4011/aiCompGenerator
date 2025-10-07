import React, { useState } from 'react'
import Navbar from "../Components/Navbar"
import Select from 'react-select';//react select is a library for select box 
import { BsStars } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { TbFileExport } from "react-icons/tb";
import { ImNewTab } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { ClipLoader } from "react-spinners";//for loader in react
import Editor from '@monaco-editor/react';//monaco editor is use to add code editor react component from react 
import { GoogleGenAI } from "@google/genai";//this is from gemini ai api for creating gemini api 
//whole react icons taken from react icons a github repo or you can use ract icon of npm also 
import { toast } from 'react-toastify';//from npm library to pop a error or success of some event 
function Home() {
  const options = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind +  Bootstrap' }
];
const [outputScreen,setOutputScreen]=useState(false);//for showing code screen when searching happens 
const [tab,setTab]=useState(1);
const [prompt,setPrompt]=useState("")//this prompt is used to show that what prompt is written in description box area textarea part prompt 
const [framework,setFramework]=useState(options[0])//this framework is use to show value on state that which framework is select from react select options 
const [code, setCode] = useState("")
const [loading, setLoading] = useState(false);
const [isnewTabopen,setIsnewTabopen]=useState(false);

const ai = new GoogleGenAI({apiKey:"AIzaSyCpnoTVE8fDG18-Atair9U45XixCCYzpnk"});
// this function made to handle the API 
async function getResponse() {
  setLoading(true);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: ` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.`,
  });
  console.log(response.text);
  setCode(extractCode(response.text));
  setOutputScreen(true);
  setLoading(false);
}

//there is a default in response we get response with 3 (```)  so we make a function bu using regex (regular expression) to remove this from response 
function extractCode(response){
  //this regex is used to extract the part inside ```partinside``` 
  const match=response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
  return match?match[1].trim():response.trim();
}
//function to copy all code
const copyCode=async ()=>{
  try{
    await navigator.clipboard.writeText(code);
    toast.success("code copied succesfully!")
    // console.log('content copied to clipboard')
  }
  catch(err){
    // console.error('failed to copy: ',err)
    toast.error("Failed to copy!")
  }
}

///function to export code 
const downloadFile=()=>{
  const filename="GenUI-code.html";
  const blob=new Blob([code],{type:'text/plain'});
  let url=URL.createObjectURL(blob);
  const link =document.createElement('a');
  link.href=url;
  link.download=filename;
  link.click();
  URL.revokeObjectURL(url);
  toast.success("File downloaded succesfully!");
}

  return (
    <>
    <Navbar/>
    <div className="hm flex items-center justify-between gap-[20px]">
      <div className="left w-[50%] h-[80vh] bg-[#141319] mt-5">
        <h3 className=' lt text-[25px] font-semibold sp-text'> AI component generator</h3>
        <p className='lt text-[gray] mt-[2px] text-[15px]'>Describe your component and let AI will code for you </p>
        <p className='lt text-[18px] font-bold'>Framework</p>
        <Select onChange={(e)=>{setFramework(e.value)}} className="  lt leftSelect " styles={{ marginTop:"4px", padding:"4px"}} options={options}/>
        <p className='lt text-[15px] font-[700] '>Describe Your Component</p>
        <textarea onChange={(e)=>{setPrompt(e.target.value)}} value={prompt} className='lefttextarea p-[10px] w-full min-h-[200px] rounded-xl bg-[#09090B]' style={{padding : '10px'}} placeholder="Describe your component's detail and let AI will code for you"></textarea>
        <div className='flex items-center justify-between'>
          <p className='text-[gray]'>Click on Generate button to generate your code</p>
        <button onClick={getResponse} className="generate flex items-center rounded-lg border-0 bg-[#737bea] bg-[linear-gradient(to_right,#efd5ff_0%,#515ada_100%)] gap-[2px] transition-all hover:opacity-[.8] " style={{marginLeft:"auto",marginTop:3, paddingTop:"5px",paddingBottom:"5px", paddingInline:"5px", cursor:"pointer"}}>
         {
            loading===true?
          <>
            <ClipLoader size={20}/>
          </>:<i><BsStars /></i> 
          }Generate</button>
        </div>
      </div>
      <div className="right relative w-[50%] h-[80vh] bg-[#141319] mt-5">
        {
          (outputScreen===false)?
          <>
          {
            loading===true?
          <>
          <div className="flex justify-center text-white " style={{marginTop:"200px"}} >
            <ClipLoader color='white' size={100}/>
          </div>
            
          </>:<>
          <div className="skeleton w-full h-full flex items-center flex-col justify-center">
          <div className="circle w-[70px] flex items-center justify-center h-[70px] rounded-[50%] p-[20px] bg-[linear-gradient(to_right,#efd5ff_0%,#515ada_100%)]"><FaCode/> </div>
          <p className='text-[gray] text-[16px]' style={{marginTop:3}}>your component code will appear here</p>
        </div>
        </>
          }
        </>: <>
        <div className="top h-[60px] w-[full] bg-[#17171c] flex items-center gap-[15px]" style={{paddingLeft:"20px", paddingRight:"20px"}}>
          <button onClick={()=>{setTab(1)}} className={`btn w-[50%] cursor-pointer rounded-xl transition-all hover:bg-[#333] ${ tab === 1 ?"bg-[#333]":"" }`} style={{padding:"10px"}}>code</button>
          <button onClick={()=>{setTab(2)}} className={`btn w-[50%] cursor-pointer rounded-xl transition-all hover:bg-[#333] ${ tab === 2 ?"bg-[#333]":"" }`}  style={{padding:"10px"}}>preview</button>
        </div>
        <div className="top-2 h-[60px] w-[full] bg-[#17171c] flex items-center justify-between gap-[15px]" style={{paddingLeft:"20px", paddingRight:"20px"}}>
          <div className="top2Left">
            {
              tab===1?
              <>
              <p className='font-bold'>Code Editor</p>
              </>:
              <>
              <p className='font-bold'>Code preview</p></>
            }
            {/* <p className='font-bold'>Code Editor</p> */}
          </div>
          <div className="top2right flex gap-[10px] items-center ">
            {
              tab===1?<>
              <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={copyCode} ><i><FaRegCopy/></i></button>
            <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={downloadFile} ><TbFileExport/></button>
              </>:
              <><button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={()=>{setIsnewTabopen(true)}} ><ImNewTab/></button>
            <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]"><FiRefreshCcw/></button>
              </>

            }
            
          </div>
        </div>
        <div className="editor h-[55vh] ">
          {
            tab==1?<>
            <Editor height="100%" theme='vs-dark' language="html" value={code} />
            </>:
            <>
            <iframe srcDoc={code} className="preview w-full h-[55vh] bg-yellow-50 text-black flex items-center justify-center" value={code}></iframe>
            </>
          }
        </div>
        </>
        }
        
      </div>
    </div>
    {
      isnewTabopen===true?<>
      <div className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-screen overflow-auto">
        <div className="topContainer w-full h-[60px] flex items-center justify-between" style={{paddingLeft:"20px",paddingRight:"20px"}}>
          <div className="topContainerleft">
            <p className="font-bold text-[black]">Preview</p>
          </div>
          <div className="topContainerright flex items-center gap-[10px]">
            <button className="copy bg-[#333] w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-red-600 " color='red'  onClick={()=>{setIsnewTabopen(false)}}><IoClose/></button>
          </div>
        </div>
        <iframe srcDoc={code} className='w-full h-full' ></iframe>
      </div>
      </>:""
    }
    </>
  )
}

export default Home
//API key
// AIzaSyCpnoTVE8fDG18-Atair9U45XixCCYzpnk