# Beam Mobile App Directions

## Installation

Run 'npm i' to install all node_modules needed for this project.

Due to an issue with metro, you have to change

/node_modules/metro-config/src/defaults/blacklist.js

the line with var sharedBlacklist at the top of the file should be:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

Building under iOS, when building there will be some directions shown in xcode and the terminal to remove ttf files.  Follow those directions on the first build.

## Tests

I am using unit tests with mocks for the services and snapshot tests for the component renders.

After running a 'npm i' to get all of the dependencies in place, run 'npm test' to run the jest tests for the app.

## Disclosure

I utilized react-native-svg for the SVG logo and had to do some formatting on the SVG XML due to this.  I attempted to use react-native-svg-transformer but ran into issues with metro and the transformer library.  This ate a bit of time I would have used to do items in the TODO section

I do not own a personal Mac so to test the iOS setup / install I had a friend with a Macbook pull my code from github and run the project.  I had missed a couple of packages in the podfile but after these were installed manually the app started and ran successfully.  I have since added these to the podfile for installation.

## TODO

I would set an icon for the app
I would add more snapshot and unit tests for the components depending on different data (requires mocking services into the components)
I would consolidate reused styles / colors into a central file for use in the components
I would utilize javascript classes for the member and brushing entry if this were a larger project communicating with an API
