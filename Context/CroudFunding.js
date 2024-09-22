import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./context";

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        const checkWalletConnection = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const accounts = await provider.listAccounts();
            setCurrentAccount(accounts[0]);
        };
        checkWalletConnection();
    }, []);

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()
            );
            await transaction.wait();
            console.log("Transaction mined:", transaction);
        } catch (error) {
            console.log("Error creating campaign:", error);
        }
    };

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatUnits(campaign.target.toString(), 18),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatUnits(campaign.amountCollected.toString(), 18),
            pid: i,
        }));
        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();
        const account = await window.ethereum.request({ method: "eth_accounts" });
        const currentUser = account[0];
        const filteredCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner === currentUser
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatUnits(campaign.target.toString(), 18),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatUnits(campaign.amountCollected.toString(), 18),
            pid: i,
        }));
        return userData;
    };

    const donate = async (pid, amount) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.donateToCampaign(pid, {
                value: ethers.utils.parseEther(amount),
            });
            await transaction.wait();
            location.reload();
            return transaction;
        } catch (error) {
            console.log("Error donating to campaign:", error);
        }
    };

    const getDonations = async (pid) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonations(pid);
        const numberOfDonations = donations[0].length;

        const parsedDonations = donations[0].map((donor, i) => ({
            donor,
            amount: ethers.utils.formatUnits(donations[1][i].toString(), 18),
        }));

        return parsedDonations;
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};