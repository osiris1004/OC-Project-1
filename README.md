
![Telesport](/src/assets/images/teleSport.png)


# About The Project

Olympic Games Starter, is a small application that provides a dashboard to the user in order to graphically visualize the olympic game statistics of precedence years.

# Built With

This section should list any major frameworks/libraries used in the project. Here are a few examples.
 - Angular
 - Chart js
 - RxJS

# Getting Started
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

## Prerequisites
This is an example of how to list things you need to use the software and how to install them.

1. Clone the repo
    >`git clone https://github.com/osiris1004/OC-Project-1.git`

2. Install NPM packages
    >`npm install`

3. npm
    >`npm start`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Core concepts 

## Memory Leaks
In RxJS, each time you subscribe to an Observable, you must then unsubscribe. If you don't unsubscribe, the subscription will exist in memory, and whenever the subject emits a value, the subscription logic will execute and hence memory leak.

## Git Flow
Git Flow is a branching model for Git, for managing the development and release of software. The Git Flow model consists of two main branches and develop, as well as several supporting branches for feature development, bug fixes, and releases.

Here is a brief overview of the main branches and supporting branches in the Git Flow model:

1. **main branch**: This is the main branch that contains the stable and production-ready code. The master branch is always kept in a deployable state and represents the latest release version of the software.

2. **develop branch**: This branch is used for ongoing development and is the main integration branch for feature branches. All new development is merged into the develop branch, which is periodically merged into the master branch when a new release is ready.

3. **Feature branches**: These are branches created off the develop branch for developing new features or enhancements. Feature branches are short-lived and are typically deleted once the feature is completed and merged back into the develop branch.

4. **Release branches**: These are branches created off the develop branch for preparing a new release. Release branches are used to stabilize the code and perform final testing and bug fixing. Once the release is ready, the changes are merged into the master branch and tagged with a release version.



## Contact
Mailto : <a href="mailto:email@example.com, secondemail@example.com">Send Email</a>



