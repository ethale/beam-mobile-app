# Beam Mobile App Exercise
Here at Beam, we provide our members with a Beam app to perform member functions, view their brushing details, and access their insurance card. 

In this kata, you will be providing a member with their very own Beam app! From within the app, they will be able to view their member info, and add/update/delete/view brushing data.

## Getting Started

### Expectations
#### Language/Framework
We expect the following technologies to be used as a baseline:
- iOS: Latest version of Xcode, Swift, and iOS SDK
 - Target build and testing for iPhone Xs Simulator
- Android: Latest Released API Version, Java or Kotlin
 - Target build and testing for Android Simulator 28.0.25 with Pixel 2 skin

**Please include instructions detailing how to run your submission in the README.**

#### UI/UX Design
You may have noticed: there is no mockup or prototype provided. You have free rein in the UI/UX Design of this exercise!

That's not to say we expect you to be a UI/UX Designer. At a minimum, we're just expecting to see tasteful alignment and use of the branding assets included.

#### Testing
Please include tests with your submission. **Instructions for running your tests should be included in the README.**

## Submitting your work to Beam

Once you're happy with your submission, you can send it back in one of two formats; either as a git bundle or a zip file.

To create the git bundle simply execute:

```bash
cd beam-mobile-exercise
git bundle create beam-mobile-exercise.bundle <YOUR BRANCH NAME HERE>
```

This will create a `.bundle` file which contains the entire git repository in binary form, so you can easily send it as an attachment.  Alternately, you can zip the project instead.

## Exercise

The steps for this exercise are broken out into user stories below.

### User Stories
#### Member Info Screen 
_As a Beam Member_  
_I want to have a Member Info screen_  
_So I can view my member information_   

Acceptance Criteria
- There is a page for member information.
- The Beam logo (see `assets/images/beam_logo.svg`) is displayed at the top of the page.
- The member's `name` is displayed on the Member Info screen. (See [Getting the Member Data](#getting-the-member-data))
- The member's `shipping_address`, `shipping_city`, `shipping_state`, and `shipping_zip_code` are all displayed on the screen in a "Shipping Address" section on the Member Info Screen.

#### Member's Brushing Information Summary
_As a Beam Member_  
_I want a section on the Member Info screen that shows brushing history_  
_So that I can view my brushing history_  

Acceptance Criteria
- The member's Brushing History records (date/time and duration) are displayed on the Member Info screen in a list or table view

#### Member's Brushing Information Screen
_As a Beam Member_  
_I want a screen to look at a brush record_  
_So that I can edit/create new brush actions_   

- The Brushing Info screen shows an editable Date/Time and brush Duration (minutes)
- The Brushing Info screen has a cancel and save button

#### Member's Brushing Information Creation
_As a Beam Member_  
_I want to be able to create brushing information records_  
_So that I can add brush actions_  

Acceptance Criteria
- There is a button to add a new Brushing Info record on the Member Info screen, located above the brushing history table/list
- When the add button is tapped, the Brushing Information screen is loaded with a new record, and the date/time defaults to current date/time
- When Save is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and can view my new record in the history list/table
- When Cancel is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the new record is discarded

#### Member's Brushing Information Update
_As a Beam Member_  
_I want to be able to edit brushing information records_  
_So that I can edit brush actions_  

Acceptance Criteria
- There is an edit option on the existing Brushing Info records on the Member Info screen
- When edit is tapped, the Brushing Information screen is loaded with the date/time and brush duration populated with the selected record data
- When Save is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the history list/table reflects the updated record
- When Cancel is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the record changes are discarded


#### Member's Brushing Information Delete
_As a Beam Member_  
_I want to be able to delete brushing information records_  
_So that I can remove brush actions_  

Acceptance Criteria
- There is a delete option on the existing Brushing Info records on the Member Info screen
- When delete is tapped, I am prompted: "Are you sure you would like to delete the record from [Date/Time]?" with "Yes" and "No" options
- If "No" is selected, I am returned to the Member Info Screen with no changes to the data
- If "Yes" is selected, the Brushing Info record is removed, I am returned to the Member Info Screen, and the history list/table reflects the removed record

---

### Getting the Member Data
For this exercise, you'll be displaying the data for a member named "Remy LeBeau". We've gone ahead and searched for his name in the system. You can find the results at [https://member-data.beam.dental/searchResults.json](https://member-data.beam.dental/searchResults.json). Note: in a production scenario we would have a RESTful API to query data from... For this exercise, we have just posted a static JSON file for download.

Unfortunately, his data has gotten a little messed up. There are some invalid records that you'll need to sort through to get his current data. The valid member record for Remy:
- Does not have a `primary_insured_id`. (He's his own primary insured.)
- Does not have a `terminated_at` date. (He still has insurance active.)
- Has the most recent `effective_date`. (Older ones might not be attached to the correct data anymore.)
