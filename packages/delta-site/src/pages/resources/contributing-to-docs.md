---
title: Contributing to Documentation
layout: ../../layouts/Markdown.astro
---

Like answering questions, contributing to documentation is an important place where contributions are needed. Contributing to documentation is also a great place to start learning and contributing to open source. Even this website is built so that developers such as yourself can contribute!

## [Delta.io > Github](https://github.com/delta-io/website)

The Delta.io website, documentation, and the issues that need to be worked on can be found [here in the issues section](https://github.com/delta-io/website/issues) of the Github repository. This is also a great place to propose your own issues and solutions with the current documentation.

The website is built on top of the Gatsby.js framework which allows us to build the content of the website using **`MDX`** - Markdown eXtension thus making things easy to create and edit. This will also simplify version control because we put the **`mdx`** files directly into GitHub. This approach allows the community to edit the delta.io website and documentation directly.

Initial setup to contribute to [Delta.io](http://Delta.io)

- Use your favorite IDE to edit these **`mdx`** files. We suggest Visual Studio Code if you don’t have a preference
  - Install _Visual Studio Code_
  - Install _MDX Preview_ and _Prettier - Code formatter_ extensions
- Fork the https://github.com/delta-io/website site to your own (e.g. https://github.com/dennyglee/website) so you can make edits to your fork of the site.
- **NOTE:** Most of the changes we will be doing are in the **`src`** folder.

## Adding a new blog to [Delta.io](http://Delta.io)

To demonstrate how a contributor can add or edit content to Delta.io, we will step through how to add a new blog to the site.

- Each blog is stored as its own separate folder in the **`$/../src/blog`** folder organized by date.
- Each folder contains an **`index.mdx`** file (Markdown extension) plus the associated images
  - There typically is a thumbnail.png which is the image that shows up on the https://delta.io/blog as a featured image
  - You can also include any other images that are needed for the blog.
- To create a new blog, start by creating a new folder in your own fork of the site; the following is the view from VS Code (right-click on blogs, click on New folder). Follow the same naming convention of YYYY-MM-DD-name_of_blog for the folder name
- Copy a previous blog’s **`index.mdx`** and ensure to update the metadata at the top of the blog.
  - Note that there is a **`./thumbnail.png`** reference, copy an image to the same folder and rename it as **`./thumbnail.png`** OR update the metadata key thumbnail with the path of the image. Ensure the image file name is PNG and does not have any spaces in the name.
- If you want to copy/paste an existing blog (e.g. old delta.io site) over to the new site, you can use the copy/paste HTML to markdown tool at: https://euangoddard.github.io/clipboard2markdown/
- If you have _MDX Preview_ extension installed, with the magnifying glass icon on the top right you can preview your blog such as the following screenshot.

## Creating a pull request and deploying

After completing changes locally, like the one above, you can now push to Github and deploy them using the steps below:

- Once you have completed your edits, commit these changes to your fork. The following is a screenshot from the VS Code Source Control window. Ensure you add a description (e.g. “Adding Delta Survey 09/16/2021 blog”) and click on the checkmark box to commit changes.
- Go to your branch and create a new pull request to master. Once you do this, a number of checks will automatically be performed and a staging site will be generated. This allows reviewers to both see the file diff as well as the preview of what the site will look like.

  **NOTE:** This preview will take some time.

  You can view an example of this at: https://github.com/jakebellacera/delta-lake/pull/15

- **NOTE:** Netlify (bot) allows you to explore the source changes, inspect the deploy log, and browse the preview. To view the changes, click on the browser preview link. For example,
  - The browser preview link above is: https://deploy-preview-15--delta-lake.netlify.app/
  - Clicking on it reviews the entire site staged for your review.
  - Since this is a blog, click on [blog] and then you’ll notice the survey blog (in this example) posted to the top left.
- Presuming all checks are passed, the changes are then subsequently merged into your commit.

## Running the website locally

To run the website locally, run the command **`npm run develop`** from the repo folder. If you have never done this before, you first set up npm. To do so, run the following commands:

- **`npm i -g gatsby-cli`**
- **`npm install --save`**
- **`npm run develop`**
- When it is finished, you will be given the localhost url, http://localhost:8000/ to view your site.
