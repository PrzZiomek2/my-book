import React, { useEffect } from 'react';

import { NextPage } from 'next';

import Tabs from '@/components/ui/Tabs';
import { ProfileSection } from '@/components/profile/profileSection/ProfileSection';
import { AccountData } from '@/components/profile/AccountData';
import { Box } from '@mui/material';
import styles from './styles.module.css'

 const Profile: NextPage = () => {
  return (
    <div className={styles.profile_page}>
      <h2>Twój profil</h2>
      <Box gridArea="content">
        <Tabs 
          ariaLabel='profil użytkownika'
          items={[
            { 
              panel: <ProfileSection />, 
              tab: { label: "Wizytówka"} 
            },
            { 
              panel: <AccountData/>,
              tab: { label: "Dane Konta"} 
            },
          ]}
        />
      </Box>
    </div>
  )
}

export default Profile;
