/* Imports */
import { axiosReq  } from '../api/axiosDefaults';

/*
  Renders and sends data to the InfiniteScroll component
  Sends a request for data to the next page
  Filters out duplicated data
*/
export const fetchMoreData = async (resource, setRescource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setRescource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
       ? acc
      : [...acc, cur]
    }, prevResource.results)
    }));
  } catch (err){
    
  }
}

/*
  Allows user to follow a profile, incrementing following_count by 1
  Profiles followed, icrementing followers_count by 1
*/
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ?
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ?
      { ...profile, following_count: profile.following_count + 1 }
    :
      profile;
};

/*
  Allows user to follow a profile, decreasing following_count by 1
  Profiles followed, decreasing followers_count by 1
*/
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ?
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ?
      { ...profile, following_count: profile.following_count - 1 }
    : 
      profile;
};