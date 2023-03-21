import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns,searchTerm }) => {
  const navigate = useNavigate();
  const {address} = useStateContext()
  
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  const filtered= campaigns.filter((campaign) => {

    return campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
  }); 
  return (
    <div >
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          {searchTerm === '' ? `${title} (${campaigns.length})` : `Searching Result (${filtered.length})`}
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]"  >
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {address ? "You have not created any campigns yet" : "Connect to see your campaigns"}
          </p>
        )}
        {!isLoading && campaigns.length > 0 && filtered.map((campaign) => {
          return (
            <FundCard key={campaign.pId}
            {...campaign}
            isInProfile={title ==='My Campaigns' ? true : false}
            handleClick={() => handleNavigate(campaign)}
            />
          );
        })}

      </div>
    </div>
  )
}

export default DisplayCampaigns