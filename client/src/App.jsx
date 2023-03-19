import React ,{useState } from 'react';
import { Route, Routes} from 'react-router-dom';

import {CampaignDetails, CreateCampaign ,Home,Logout,Profile} from './pages';
import {Sidebar, Navbar} from './components';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return ( 
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar handleSearchChange={handleSearchChange}/>

        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm}/>} />
          <Route path="/profile" element={<Profile searchTerm={searchTerm}/>} />
          <Route path="/create-campaign" element={<CreateCampaign />} /> 
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  )
}

export default App