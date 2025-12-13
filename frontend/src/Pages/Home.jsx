
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
import Editor from '@monaco-editor/react';//monaco editor is use to add code editor react component from react S
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
  const [outputScreen, setOutputScreen] = useState(false);//for showing code screen when searching happens 
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("")//this prompt is used to show that what prompt is written in description box area textarea part prompt 
  const [framework, setFramework] = useState(options[0])//this framework is use to show value on state that which framework is select from react select options 
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false);
  const [isnewTabopen, setIsnewTabopen] = useState(false);

  //this API fail because someone injected something 
  // const ai = new GoogleGenAI({apiKey:"AIzaSyCpnoTVE8fDG18-Atair9U45XixCCYzpnk"});

  // this function made to handle the API 

  async function getResponse() {
    if (!prompt.trim()) return;

    setLoading(true);
    setOutputScreen(false);

    try {
      // Point to the backend server
      //now change the backend fetching with bakcend render link
      // const res = await fetch("/api/genai", {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/api/genai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          framework: framework.value || framework, // ensure we send string
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (!data?.text) {
        throw new Error("No text returned from API");
      }

      setCode(extractCode(data.text));
      setOutputScreen(true);

    } catch (err) {
      console.error(err);
      alert("Failed to generate code");
    } finally {
      setLoading(false);
    }
  }



  //there is a default in response we get response with 3 (```)  so we make a function bu using regex (regular expression) to remove this from response 
  function extractCode(response) {
    //this regex is used to extract the part inside ```partinside``` 
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }
  //function to copy all code
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("code copied succesfully!")
      // console.log('content copied to clipboard')
    }
    catch (err) {
      // console.error('failed to copy: ',err)
      toast.error("Failed to copy!")
    }
  }

  ///function to export code 
  const downloadFile = () => {
    const filename = "GenUI-code.html";
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded succesfully!");
  }

  return (
    <>
      <Navbar />
      <div className="hm flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="left w-full lg:w-1/2 min-h-[60vh] bg-[#141319] rounded-xl">
          <h3 className=' lt text-[25px] font-semibold sp-text'> AI component generator</h3>
          <p className='lt text-[gray] mt-[2px] text-[15px]'>Describe your component and let AI will code for you </p>
          <p className='lt text-[18px] font-bold'>Framework</p>
          <Select onChange={(e) => { setFramework(e.value) }} className="  lt leftSelect " styles={{ marginTop: "4px", padding: "4px" }} options={options} />
          <p className='lt text-[15px] font-[700] '>Describe Your Component</p>
          <textarea onChange={(e) => { setPrompt(e.target.value) }} value={prompt} className='lefttextarea p-[10px] w-full min-h-[200px] rounded-xl bg-[#09090B]' style={{ padding: '10px' }} placeholder="Describe your component's detail and let AI will code for you"></textarea>
          <div className='flex items-center justify-between'>
            <p className='text-[gray]'>Click on Generate button to generate your code</p>
            <button onClick={getResponse} disabled={loading} className="generate flex items-center rounded-lg border-0 bg-[#737bea] bg-[linear-gradient(to_right,#efd5ff_0%,#515ada_100%)] gap-[2px] transition-all hover:opacity-[.8] " style={{ marginLeft: "auto", marginTop: 3, paddingTop: "5px", paddingBottom: "5px", paddingInline: "5px", cursor: "pointer" }}>
              {
                loading === true ?
                  <>
                    <ClipLoader size={20} />
                  </> : <i><BsStars /></i>
              }Generate</button>
          </div>
        </div>
        <div className="right relative w-full lg:w-1/2 bg-[#141319] rounded-xl flex flex-col">
          {
            (outputScreen === false) ?
              <>
                {
                  loading === true ?
                    <>
                      <div className="flex justify-center text-white " style={{ marginTop: "200px" }} >
                        <ClipLoader color='white' size={100} />
                      </div>

                    </> : <>
                      <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                        <div className="circle w-[70px] flex items-center justify-center h-[70px] rounded-[50%] p-[20px] bg-[linear-gradient(to_right,#efd5ff_0%,#515ada_100%)]"><FaCode /> </div>
                        <p className='text-[gray] text-[16px]' style={{ marginTop: 3 }}>your component code will appear here</p>
                      </div>
                    </>
                }
              </> : <>
                <div className="top h-[60px] w-[full] bg-[#17171c] flex items-center gap-[15px]" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <button onClick={() => { setTab(1) }} className={`btn w-[50%] cursor-pointer rounded-xl transition-all hover:bg-[#333] ${tab === 1 ? "bg-[#333]" : ""}`} style={{ padding: "10px" }}>code</button>
                  <button onClick={() => { setTab(2) }} className={`btn w-[50%] cursor-pointer rounded-xl transition-all hover:bg-[#333] ${tab === 2 ? "bg-[#333]" : ""}`} style={{ padding: "10px" }}>preview</button>
                </div>
                <div className="top-2 h-[60px] w-[full] bg-[#17171c] flex items-center justify-between gap-[15px]" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <div className="top2Left">
                    {
                      tab === 1 ?
                        <>
                          <p className='font-bold'>Code Editor</p>
                        </> :
                        <>
                          <p className='font-bold'>Code preview</p></>
                    }
                  </div>
                  <div className="top2right flex gap-[10px] items-center ">
                    {
                      tab === 1 ? <>
                        <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={copyCode} ><i><FaRegCopy /></i></button>
                        <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={downloadFile} ><TbFileExport /></button>
                      </> :
                        <><button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]" onClick={() => { setIsnewTabopen(true) }} ><ImNewTab /></button>
                          <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-[#333]"><FiRefreshCcw /></button>
                        </>

                    }

                  </div>
                </div>
                {/* <div className="editor flex-1 min-h-[300px] lg:min-h-[55vh] "> */}
                <div className=" editor flex-1 min-h-[300px] lg:min-h-[55vh] overflow-auto">
                  {
                    tab === 1 ? <>
                      <Editor
                        height="100%"
                        theme="vs-dark"
                        language="html"
                        value={code}
                        options={{
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          minimap: { enabled: false },
                          automaticLayout: true
                        }}
                      />
                    </> :
                      <>
                        <iframe
                          className="w-full  bg-white border-0 overflow-auto"
                          height="100%"
                          srcDoc={`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>body{margin:0;padding:16px}</style>
</head>
<body>
${code}
</body>
</html>`}
                        />

                      </>
                  }
                </div>
              </>
          }

        </div>
      </div>
      {
        isnewTabopen === true ? <>
          <div className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-[55vh] overflow-auto">
            <div className="topContainer w-full h-[60px] flex items-center justify-between" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <div className="topContainerleft">
                <p className="font-bold text-[black]">Preview</p>
              </div>
              <div className="topContainerright flex items-center gap-[10px]">
                <button className="copy bg-[#333] w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-700 flex items-center justify-center transition-all hover:bg-red-600 " color='red' onClick={() => { setIsnewTabopen(false) }}><IoClose /></button>
              </div>
            </div>
            <iframe srcDoc={code} className='w-full h-full border-0' ></iframe>

          </div>
        </> : ""
      }
    </>
  )
}

export default Home




