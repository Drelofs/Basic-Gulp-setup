# Basic Gulp setup
Basic Gulp 4 environment for starting front end development.

## Installing Gulp
To use Gulp you first need to install Node.js and the included `npm` package manager,  which can be found [here](https://nodejs.org/en/download/). After installing Node.js, you can run the command `npm -v` in the terminal, to see your installed version of `npm`.

Open a terminal window and type the following command to install the Gulp command line interface (CLI) globally on your pc:

`npm install -g gulp-cli`

The `package.json`  and the `gulpfile.js` are already included in this project, so you only need to take the following steps:

1. Open a terminal window at the root of this project.
2. Run the following command: `npm install`. This will install the node modules required for the Gulp tasks.
3. Lastly, run the command `gulp`. A browser window will open with the index.html file open.
4. Happy coding!

After this, you need to keep the `gulp` terminal open, so changes in your dev files will automatically generate the style and script files for your project and refresh the browser window.