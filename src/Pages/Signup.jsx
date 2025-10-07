import React from 'react'

function Signup() {
  return (
    <>
    <div className="container flex items-center justify-center " style={{padding:"15px"}}>
      <form action="" className='mt-6 flex w-[450px] h-[550px] bg-amber-50 flex-col items-center rounded-xl border-[1px] border-zinc-500 gap-y-4' style={{padding:"20px",margin:"20px"}}>
        <h1 className='font-bold text-black text-3xl'>Welcome to Sign Up Page</h1>
        <br />
        <label  className='w-full '>
            <p className="mb-1  flex items-center justify-center leading-[1.375rem] text-gray-900">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",padding:"12px"
          }}
          className="w-full border-[1px] border-zinc-300 rounded-[0.5rem] bg-gray-100 p-[12px] text-black"
        />
        </label>
        <br />
        <label className="relative w-full">
        <p className="mb-1  flex items-center justify-center leading-[1.375rem] text-black">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type= "password"
          name="password"
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",padding:"12px"
          }}
          className="w-full border-[1px] border-zinc-300 rounded-[0.5rem] bg-gray-100 p-[12px] pr-12 text-black"
        />
        </label>
        <br />
        <label className="relative w-full">
        <p className="mb-1  flex items-center justify-center leading-[1.375rem] text-black">
         confirm Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type= "password"
          name="password"
          placeholder="Password should match"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",padding:"12px"
          }}
          className="w-full border-[1px] border-zinc-300 rounded-[0.5rem] bg-gray-100 p-[12px] pr-12 text-black"
        />
        </label>
        <br />
        <button
        type="submit" style={{ paddingLeft:"12px",paddingRight:"12px",paddingTop:"8px",paddingBottom:"8px",marginBottom:"2px"}}
        className="mt-6 w-[100px] rounded-[8px] bg-cyan-950 py-[8px] px-[12px] font-medium text-white"
      >
        Sign Up
      </button>
    </form>
    </div>
    </>
  )
}

export default Signup