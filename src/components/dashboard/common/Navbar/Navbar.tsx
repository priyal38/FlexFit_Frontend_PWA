
import React from 'react';
import { useState , useEffect, useRef } from 'react'; // Import useState hook
import userImage from '../../../images/user.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../../images/MainLogo.png'
import DropdownUser from './DropdownUser';


interface NavbarProps {
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

 

  const handleToggle = () =>{
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <nav className=" sticky top-0 z-40 flex w-full bg-surface-100  dark:bg-boxdark dark:drop-shadow-none">
   
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
   
        <div className="flex items-center gap-2 sm:gap-4 md:hidden">
          <button
            onClick={handleDrawerToggle}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          
         
          </div>

          <h1 className="text-lg font-bold text-white ">Welcome Back!</h1>
          <div className="flex items-center">
       
            <DropdownUser/>
           
          </div>
        </div>
      
    </nav>


  // 
  );
};

export default Navbar;
