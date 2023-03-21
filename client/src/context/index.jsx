import React,{useContext, createContext} from 'react'

import {useAddress,useContract,useMetamask,useContractWrite} from '@thirdweb-dev/react'
import {ethers} from 'ethers'

const StateContext = createContext();

export const StateContextProvider = ({children}) =>{

    const { contract} =useContract('0xAA04d00C3C2Fd696039F6ba0eE59E12fFA6041D7')
    const {mutateAsync: createCampaign} = useContractWrite(contract,'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async(form) => { 
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])
            console.log("contract call success",data)
        } catch (error) {
            console.log("contract call failure",error)
        }
    }

    const getCampaigns = async () =>{
        const campaigns = await contract.call('getCampaigns')

        const parseCampaigns = campaigns.map((campaign,i) =>({
            owner : campaign.owner,
            title : campaign.title,
            description: campaign.description,
            target : ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId : i
        }))
        return parseCampaigns;

    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filtredCampaigns = allCampaigns.filter((campaign) =>
            campaign.owner === address )
        return filtredCampaigns
    }

    const donate = async(pId,amount) =>{
        const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)})
        return data;
    }
    const deleteCamp = async(pId) =>{
        const data = await contract.call('deleteCampaign', pId)
        return data;
    }
    const EditCampaign = async(pId) =>{
        const data = await contract.call('editCampaign', pId,_title, _description, _target, _deadline, _image)
        return data;
    }
    const getDonations = async (pId) =>{
        const donations = await contract.call('getDonators', pId)
        const numberOfDonations = donations[0].length;
        const parseDonations = []

        for (let i = 0; i < numberOfDonations; i++) {
            parseDonations.push({
                donator : donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
            
        }

        return parseDonations;
    }

    

    return(
        <StateContext.Provider
            value={
                {address,
                contract,
                connect,
                createCampaign : publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                deleteCamp,
                EditCampaign
            }
            }
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);