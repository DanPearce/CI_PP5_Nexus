# Nexus
Developed by, [Dan Pearce](https://danpearce.software/)

[Live Website](https://ci-pp5-nexus-drf-danpearce.herokuapp.com/)

![Screen Capture](docs/nexus/nexus-resoponsive.png)

Welcome to Nexus! Nexus is a social network built using React. Inspired by Instagram, this site allows users to share their images in posts to interact with other users on the site. Nexus is a community of users who like to keep in touch and share experiences on social media.

Nexus is paired with its sister application Nexus DRF, which is an API using the Django Rest Framework.

You can read more about the DRF Application following the links below:

[View the live Nexus DRF application here](https://ci-pp5-nexus-danpearce.herokuapp.com/)

[View the Nexus DRF GitHub page here](https://github.com/DanPearce/CI_PP5_Nexus_DRF)

## Contents
1. [Application Goals and User Experience](#application-goals-and-user-experience)
    - [User Goals](#user-goals)
    - [Owner Goals](#owner-goals)
    - [Target Audience](#target-audience)
    - [User Expectations](#user-expectations)
2. [User Stories](#user-stories)
3. [Design](#design)
    - [Structure](#structure)
    - [Database and Models](#database-and-models)
    - [Wireframes](#wireframes)
    - [Colour](#colour)
4. [Main Features](#main-features)
5. [Technologies](#technologies)
    - [Languages](#languages)
    - [APIs](#apis)
    - [Libraries, Frameworks and Other Technologies](#libraries-frameworks-and-other-technologies)
6. [Validation and Testing](#validation-and-testing)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [ESLint/JSX](#eslint/jsx)
    - [Accessibility Validation](#accessibility-validation)
    - [Performance Validation](#performance-validation)
    - [Device and Browser Compatibility](#device-and-browser-compatibility)
    - [User Story Testing](#user-story-testing)
7. [Bugs and Errors](#bugs-and-errors)
8. [Deployment](#deployment)
9. [Credits](#credits)
10. [Acknowledgements](#acknowledgements)

## Application Goals and User Experience
### User Goals
- Easily navigate throughout the website with ease.
- Easily distinguish if logged in, use the site in all states.
- Use Nexus to create content and share images.
- Use Nexus to interact with other users and their posts.

### Owner Goals
- Provide the user feedback while using the site.
- Provide the user and experience that is responsive.
- Ensure all users are able to easily naviagte throughout the site.

### Target Audience
- Lovers of social media, users who like to network and socialise using images.
- Users who like to follow their friends to keep up to date with their lives.
- People who like to share their images.

### User Expectations
- Experience use of the site on all devices, with a fully responsive experience.
- While navigating throughout the site, always able to understand where they are and how to get back.
- An interactive and engaging user interface that is easy to use.
- All links to be fully functioning and working throughout the site.

## User Stories
1. **USER STORY 1** : User Authentication - Profile Creation
    - As a User/Owner, I can create an account, so that I can have a user profile on the site.
2. **USER STORY 2**: User Authentication - Logging In/Out 
    - As a User, I can log into or out of my account, so that I can ensure that I can manage my profile/posts/comments.
3. **USER STORY 3**:
    - As an Owner, I can log into the admin console, so that I can moderate the content on the site. [Covered in the API Documentation](https://github.com/DanPearce/CI_PP5_Nexus_DRF)
4. **USER STORY 4**: User Interactivity - View Profiles
    - As a User, I can view all profiles, so that I can see who has posted and has an account.
5. **USER STORY 5**: User Interactivity – Profile Detail
    - As a User, I can view an individual profile, so that I can view it in full detail.
6. **USER STORY 6**: User Interactivity – Edit Profile Picture
    - As a User, I can change my profile picture, so that I can make my profile more recognisable.
7. **USER STORY 7**: User Interactivity – Edit Profile
    - As a User, I can edit my profile, so that I can modify the about me section.
8. **USER STORY 8**: User Interactivity – View Posts
    - As a User, I can view all posts, so that I can decide if I would like to interact with it.
9. **USER STORY 9**: User Interactivity – Post Detail
    - As a User, I can view an individual post, so that I can view it in full detail.
10. **USER STORY 10**: User Interactivity – Create a Post
    - As a User, I can create a post, so that I can add content to my profile.
11. **USER STORY 11**: User Interactivity – Edit Post
    - As a User, I can edit my own posts, so that I can make edits at a later stage, if needed.
12. **USER STORY 12**: User Interactivity – Delete Post
    - As a User, I can delete my own posts, so that I can manage the content on my profile.
13. **USER STORY 13**: User Interactivity – Like a Post
    - As a User, I can like a post, so that I can increase its popularity/show my interest.
14. **USER STORY 14**: User Interactivity – Unlike a Post
    - As a User, I can unlike a post, so that I can decrease its popularity/remove my interest.
15. **USER STORY 15**: User Interactivity – View Comments
    - As a User, I can view all comments, so that I can engage with the content.
16. **USER STORY 16**: User Interactivity – Create a Comment
    - As a User, I can create a comment, so that I can share my reaction to the content.
17. **USER STORY 17**: User Interactivity – Edit Comment
    - As a User, I can edit my own comment, so that I can make any necessary changes.
18. **USER STORY 18**: User Interactivity – Delete Comment
    - As a User, I can delete my own comments, so that I have control over my comments.
19. **USER STORY 19**: User Interactivity – Follow Profile
    - As a User, I can follow another profile, so that I can increase their follower count.
20. **USER STORY 20**: User Interactivity – Unfollow Profile
    - As a User, I can unfollow another profile, so that I can decrease their follower count.
21. **USER STORY 21**: User Statistics – View Followers Count
    - As a User, I can view the followers count for any profile, so that I can determine how many followers they have.
22. **USER STORY 22**: User Statistics – View Following Count
    - As a User, I can view the following count for any profile, so that I can determine how many profiles they are following.
23. **USER STORY 23**: User Interactivity – Search
    - As a User, I can search for posts/profiles, so that I can find the content I need.
24. **USER STORY 24**: User Interactivity – Filter
    - As a Owner, I can filter posts/profiles, so that I can find the content that I need. [Covered in the API Documentation](https://github.com/DanPearce/CI_PP5_Nexus_DRF)
25. **USER STORY 25**: User Interactivity – User Feedback
    - As a User, I am provided feedback when making changes to posts/profiles, so that I am sure the change was successful/unsuccessful.
26. **USER STORY 26**: User Authentication – Refresh Access Tokens
    - As a User, I expect Refresh Access Tokens to be in place, so that I can remain logged into the site on my computer.
27. **USER STORY 27**: User Interactivity – Continuous Content
    - As a User, I am presented with a continuous flow of posts, so that I do not need to re-load any content or cycle through pages.
28. **USER STORY 28**: Site Functionality – 404 Error Page
    - As a User, I am presented with a 404-error page when I have navigated to a page that does not exist, so that I can easily find my way back to the main site.
29. **USER STORY 29**: Site Functionality – Responsive Site
    - As a User, I am presented with a site that is fully responsive, so that I can consume the content on the site regardless of device or browser.
30. **USER STORY 30**: User Authentication – Change Password
    - As a User, I can change my password, so that I can keep my account secure.
