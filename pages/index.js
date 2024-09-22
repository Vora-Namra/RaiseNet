import { useEffect, useContext, useState } from 'react';
import { CrowdFundingContext } from '../Context/CroudFunding';
import { Hero, Card, Popup } from '../Components';

const Index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
        setAllCampaigns(allData);
        setUserCampaigns(userData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaignsData();
  }, [getCampaigns, getUserCampaigns]);

  console.log(donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      <Card
        title="All Listed Campaigns"
        campaigns={allCampaigns}
        setOpenModal={setOpenModal}
        setDonateCampaign={setDonateCampaign}
      />
      <Card
        title="My Campaigns"
        campaigns={userCampaigns}
        setOpenModal={setOpenModal}
        setDonateCampaign={setDonateCampaign}
      />
      {openModal && (
        <Popup
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;
