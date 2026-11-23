/* Imports */
import { axiosReq  } from '../api/axiosDefaults';
import { jwtDecode } from 'jwt-decode';

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
  } catch {
    // console.log();
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

/*
  Remembers that the user signed in, by storing a timestamp in the browsers local storage.
  The app only checks that it exists (shouldRefreshToken), to know whether to refresh the access token.
  dj-rest-auth 7 keeps the refresh token in an HttpOnly cookie, so the "refresh" field in the response body is empty
  and the page cannot read it: use the expiry of the refresh token when it is given (older API versions, "refresh_token"
  in the body) and the time of sign in otherwise.
*/
export const setTokenTimestamp = (data) => {
  const refreshToken = data?.refresh || data?.refresh_token;
  const timestamp = refreshToken ? jwtDecode(refreshToken).exp : Math.floor(Date.now() / 1000);
  localStorage.setItem("refreshTokenTimestamp", timestamp);
};

/*
  Gets the users token timestamo from the browsers local storage
*/
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/*
  Removes the users token timestamp from the browsers local storage
*/
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};