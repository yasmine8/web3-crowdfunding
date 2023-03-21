// SPDX-License-Identifier: UNLICENSEDcreateCampaign
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns =0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256
            _target, uint256 _deadline, string memory _image) public returns (uint256){

        Campaign storage campaign = campaigns[numberOfCampaigns];

        //is everything okay?
        require(campaign.deadline < block.timestamp,"The deadline should be int he future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns -1;


    }
    function deleteCampaign(uint256 _campaignIndex) public { 
        // Ensure the campaign exists
        require(_campaignIndex < numberOfCampaigns, "Invalid campaign index");

        // Ensure the caller is the owner of the campaign
        require(msg.sender == campaigns[_campaignIndex].owner, "Only the campaign owner can delete it");

        // Shift all elements after the deleted campaign back by one index
        for (uint256 i = _campaignIndex; i < numberOfCampaigns - 1; i++) {
            campaigns[i] = campaigns[i+1];
        }

        // Delete the last element in the array
        delete campaigns[numberOfCampaigns-1];

        // Decrement the number of campaigns
        numberOfCampaigns--;
    }
    function editCampaign(uint256 _campaignIndex, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public {
        // Ensure the campaign exists
        require(_campaignIndex < numberOfCampaigns, "Invalid campaign index");

        // Ensure the caller is the owner of the campaign
        require(msg.sender == campaigns[_campaignIndex].owner, "Only the campaign owner can edit it");

        // Update the campaign properties
        Campaign storage campaign = campaigns[_campaignIndex];
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
    }

    function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id]; 

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }

    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i =0; i< numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}