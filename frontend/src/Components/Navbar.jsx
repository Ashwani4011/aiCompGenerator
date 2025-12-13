import React from 'react'
import { FaUser} from "react-icons/fa";
import {HiSun } from "react-icons/hi";
// import { RiSettings3Fill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import {  Link } from 'react-router-dom';

function Navbar() {
  
  return (
    <div>
          <div className="nav flex items-center justify-between h-[64px] px-4 sm:px-6 lg:px-10 border-b border-gray-700">
            <div className="logo ">
                <h3 className="text-[25px] sp-text  font-[700]">GenUI</h3>
            </div>
            <div className="icons flex items-center gap-[15px]">
                {/* <div className="icon"><HiSun /></div> */}
                <div className="icon"><Link to="/login" >
            <FaUser />
          </Link></div>
                <div className="icon"><Link to="/signup" ><SiGnuprivacyguard /> </Link></div>
                {/* <div className="icon"><RiSettings3Fill /></div> */}
            </div>
        </div>
    </div>
  )
}

export default Navbar