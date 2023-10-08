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
    - [FrontEnd Structure](#frontend-structure)
    - [BackEnd Structure](#backend-structure)
    - [Wireframes](#wireframes)
    - [Fonts and Icons](#fonts-and-icons)
    - [Colour](#colour)
4. [Main Features](#main-features)
5. [Technologies](#technologies)
    - [Languages](#languages)
    - [APIs](#apis)
    - [Libraries, Frameworks and Other Technologies](#libraries-frameworks-and-other-technologies)
6. [Validation and Testing](#validation-and-testing)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [ESLint JSX Validation](#eslint-jsx-validation)
    - [Accessibility Validation](#accessibility-validation)
    - [Performance Validation](#performance-validation)
    - [Device and Browser Compatibility](#device-and-browser-compatibility)
    - [User Story Testing](#user-story-testing)
    - [Bugs and Errors](#bugs-and-errors)
7. [Deployment](#deployment)
8. [Credits](#credits)
9. [Acknowledgements](#acknowledgements)

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
31. **USER STORY 31**: Site Functionality – Navigation
    - As a User, I am presented with a site that I am able to navigate with ease, so that I can easily make my way around the site.

## Design
### FrontEnd Structure
#### React
The Front End structure of Nexus has been built using React.

React is a Javascript library that is populary used among Social Media Apps and Websites. React allows developers to create easily manipulate the interface and create individual components, which can be re-used and refreshed independantly of the page, allowing for faster loading times and more engaging content.

React has been used in Nexus as it provides a vast amount of manipulation and flexibility; React code is easier to maintain and offers a way to easily manage and store code.

The ability to reuse components greatly increases the devlopment time and allows code to be easily written. 

As React is the most popular library used by Social Media applications such as Twitter and Facebook, the future sustainablity of the code is also gaurenteed. This also is met with a vast support structure and documentation and how to use the library.

The loading time of an React application is also considerably quicker as the code invidiually loads compoents as they are needed. This results in fast loading speeds overal which provides users with a faster experience. 

Using React with React Bootstrap also allows us to easily manipulate the CSS code written on the site and greatly improves development time. 

#### Components
Nexus uses a various ammount of individual components, all designed with making development and user experience better overall.

**\<Asset />** is a component that is used to display various elements that is easily re-usbale. Dependant on the prop passed into this, we are easily able to render different elements to the page.

    - spinner (A page loading spinner)
    - src (An Image to be displayed)
    - message (a message to the user)
- User Stories: 27

**\<DropdownMenu />** is a component that is used throughout the site to display a dropdown to logged in users to allow the ability to edit and delete comments and posts, this is also used on the profile page to allow users to change their password or edit their profile.
- User Stories: 6, 7, 11, 12, 17, 18, 30

**\<LandingPage />** is a component that is only used for logged out users, this replaces the usual 'home' page and encourages new users to sign up.
- User Stories: 31

**\<NavBar />** is a is component that is used on every page that has the abiliy to change based on the users loggedIn status. Logged In users are able to access their profile directly from the navigation menu and are able to sign out.
- User Stories: 31

**\<PageNotFound />** is a component that is displayed when a user naviagtes to a page that does not yet exisit. The page displays a graphic that naviagtes users back to the home page.
- User Stories: 28

**\<PopularProfiles />** is a side component that is displayed next to all posts, this component provides a list of all the most popular profiles on the site.
- User Stories: 19, 20

**\<ProfilePicture />** is a component that is used to render the profile pictures of a user on the site. The Props passed into the component allow us to change the size. 
- User Stories: 6

**\<SideNavBar />** is a side component that is also displayed next to all the posts. This component is only visblie to users who are currently logged in, and displays additional links so the users are able to access content specific to their profile. This also allows them to share and add posts to the site.
- User Stories: 10, 31

### BackEnd Structure
The Back End Structure of the site has been built using the Django REST Framework. The Nexus DRF is an API that has been created to provide data to the Nexus application. Justification and in formation regarding the API is [covered in the API Documentation](https://github.com/DanPearce/CI_PP5_Nexus_DRF)
- User Stories: 3, 24

### Wireframes
<details><summary>Landing Page</summary>
<img src="docs/wireframes/wf-landing-page.png">
</details>
<details><summary>Sign Up / Log In Page</summary>
<img src="docs/wireframes/wf-sign-up-in-page.png">
</details>
<details><summary>Post Page</summary>
<img src="docs/wireframes/wf-post-page.png">
</details>
<details><summary>Add / Edit Post Page</summary>
<img src="docs/wireframes/wf-add-edit-post-page.png">
</details>
<details><summary>Discover / Following / Liked Page</summary>
<img src="docs/wireframes/wf-discover-following-liked-page.png">
</details>
<details><summary>Profile Page</summary>
<img src="docs/wireframes/wf-profile-page.png">
</details>
<details><summary>Edit Profile Page</summary>
<img src="docs/wireframes/wf-edit-profile-page.png">
</details>
<details><summary>Change Password Page</summary>
<img src="docs/wireframes/wf-change-password-page.png">
</details>

### Fonts and Icons
#### Fonts
The main font used throughout the website is [Noto Sans Japanese](https://fonts.google.com/noto/specimen/Noto+Sans+JP), this font offers a classic sans serif design and is easy on the eyes to read. This font is used for all text that isn't the logo.

The font used for the logo is [El Messiri](https://fonts.google.com/specimen/El+Messiri) and this has been chosen as this adds a unique flare to the Logo and allows us to draw attention to the logo on the main site.

#### Icons
I used [favicon.io](https://favicon.io/) to create the favicon icons for the site.

Icons from [Font Awesome](https://fontawesome.com/) we're also used throughout the site.

### Colour

The colours I have chosen on the site all are originated from the deep purple that can be found on the NavBar. I wanted to chose a colour that is different to the usual found on social media sites, and purple felt like the correct fit for Nexus!

I've also ensured to use varients of the colour at half opacity to allow for theming to be produced.

The slightly off white colour that is used is also appealing to the eyes as the text and background of the application. 

![Colour Palette](docs/nexus/nexus-palette.png)

## Main Features
### Landing Page
The Landing Page has been implemented to welcome users, old and new, to the website, to clearly state what Nexus is about and define the clear intensions of the use of the application.

This is paired with navigational buttons and pointers to allow users to either sign up or log in to an account.
![Landing Page](docs/main-features/main-features-1.png)
**User Stories Covered: 1, 2, 31**

### Sign Up page
The Sign Up page allows the user to speak directly with the API to create a user account. In doing so, the user unlocks the full potential of Nexus. This will in turn sign the user in and access tokens will be saved to their browser.
![Sign Up](docs/main-features/main-features-2.png)
**User Stories Covered: 1, 2, 26**

### Sign In Page
The Sign In page allows user who already have an account to log back in so they can access the full features of the site. This action will save access tokens to the users browser.
![Sign In](docs/main-features/main-features-3.png)
**User Stories Covered: 1, 2, 26**

### Discover / Following / Liked Page
The Discover / Following / Liked pages act as the 'main' pages to the site.

Discover displays a list of all the posts that have been posted, and this is in decending date order.

Following displays a list of all the posts made to each account that your account is following. This is by defualt the 'home' page to allow content to be catered to you only.

Liked will display a list of all the posts that have been liked by your account.
![Main Page](docs/main-features/main-features-4.png)
**User Stories Covered: 8**

### Popular Profiles
The Popular Profiles section will display a list of the most popular profiles upon your time visiting the site. The site will display the top 10 profiles on a desktop and will show the top three whilst on mobbile. 

All profiles are easily viewable by clicking on the users name or profile icon.
![Popular Profiles](docs/main-features/main-features-5.png)
**User Stories Covered: 4**

### Navigation
Nexus has two forms of navigational sections that are included in the application.

The NavBar is the main feature, and this is always present at the top of every page, no matter how you are viewing the site. Logged in users will have the added ability to log out and to also access their profile from this NavBar. Whereas logged out users will have the opportunity to 'sign up/in'.

The SideNavBar is visible once a user has logged in. Depending on the screen size, this will either be on the side or presented at the top of the page. This section has been made visible to logged in users only as this unlocks features only avaliable to them, such as adding a post, viewing the posts they have liked, or a quick link to view their following profiles.
![NavBar](docs/main-features/main-features-7.png)
![SideNavBar](docs/main-features/main-features-6.png)
**User Stories Covered: 31**

### Add Post Page
The Add Post page has been implemented as the main point of 'sharing' on the site, and allows users to upload their own content to their profile and account.
![Add Post](docs/main-features/main-features-8.png)
**User Stories Covered: 10**

### Post Page
The Post page offers a detailed look at the post the user has clicked on. The page features the description as well as the title and also gives details on the likes / comments count.

Comments are also visible on this page.
![Post Page](docs/main-features/main-features-9.png)
**User Stories Covered: 9, 11, 12, 15**

### Comments
The comments section of the page allows all users to view all the comments that have been added to the post and who commented this.

While logged in and being the owner of the comment, users are then able to add a comment, make changes to their comment, or have the ability to delete their comment. 
![Comments](docs/main-features/main-features-10.png)
**User Stories Covered: 15, 16, 17, 18**

### Profile Page
The Profile page has been implemented to allow users to view all the content that has been posted by a particualr user. All their posts will be displayed in decending order.

If the user has gone to a profile which isn't their own, they will have the ability to follow / unfollow users from this page.

There are also various statistics displayed on this page, such as the users ammount of posts, ammount of followers and how many users they are following.
![Profile Page](docs/main-features/main-features-11.png)
**User Stories Covered: 4, 5, 19, 20, 21, 22**

### Edit Profile
The Edit Profile page has been added to allow all users to make changes to their own profiles. 

Users are able to change their display name, about section and also their profile icon.
![Edit Profile](docs/main-features/main-features-12.png)
**User Stories Covered: 6, 7**

### Change Password
The Change Password section has been added to allow users to change the password to their account. This is added as a security feature.
![Change Password](docs/main-features/main-features-13.png)
**User Stories Covered: 30**

### Search
The Search function can be found on the Discover / Following / Liked page.

The feature allows users to search for content such as by searching a username or phrase to find the content they wish to view.
![Search](docs/main-features/main-features-14.png)
**User Stories Covered: 23**

### 404 Page
The 404 Error Page has been added as a fallback for users who might navigate to the wrong page or a page that doesn't exist. The page features a link to take users back home.
![Error 404](docs/main-features/main-features-15.png)
**User Stories Covered: 28**

### Like Posts
The Like Posts feature allows users have the ability to like / unlike posts.

Users are presented with a visual aid to let them know this has been actioned.
![Likes](docs/main-features/main-features-16.png)

**User Stories Covered: 13, 14, 25**

### Infinite Content Scroll
The Infinite Scroll component has been added to allow content to be added to the site when it is needed.

By defualt all posts/comments are not shown to provide the user a faster loading time, as they scroll to find more content, this will load.
![Infinite Scroll](docs/main-features/main-features-17.png)
**User Stories Covered: 27**

## Technologies
### Languages
- [HTML](https://en.wikipedia.org/wiki/HTML5)
- [CSS](https://en.wikipedia.org/wiki/CSS)
- [Bootstrap](https://getbootstrap.com/)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [React](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)

### APIs

### Libraries, Frameworks and Other Technologies

## Validation and Testing
### HTML Validation

### CSS Validation

### ESLint JSX Validation

### Accessibility Validation

### Performance Validation

### Device and Browser Compatibility

### Manual Testing

### Bugs and Errors

## Deployment

## Credits

## Acknowledgements

#### [Back to Top](#contents)