/* Imports */
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { axiosRes, axiosReq } from '../api/axiosDefaults';
import { followHelper, unfollowHelper } from '../utils/Utils';
import { useCurrentUser } from './CurrentUserContext';

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: []}
  });
  const currentUser = useCurrentUser();

  /*
    Makes an API request to pull data for the most followed users
    Displays in a list from most to least
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
      //  console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  /*
    Makes an API request to follow a user
    Based on ID carrys out the task
    Increments followers_count by 1
    Increments following_count by 1
  */
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          )
        }
      }));
    } catch (err) {
    //  console.log(err);
    }
  };

  /*
    Makes an API request to follow a user
    Based on ID carrys out the task
    Decreases followers_count by 1
    Decreases following_count by 1
  */
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          )
        }
      }));
    } catch (err) {
    //  console.log(err);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};