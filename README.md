# Viettel Digital Talent 2024 - Mini Project
Author: **Đinh Việt Quang**

## Table of Contents 
- [0. Requirements](#0-requirements)
- [1. Building a simple 3-tier web application](#1-building-simple-3-tier-web-application)
- [2. Containerization](#2-containerization)
- [3. Continuous Integration](#3-continuous-integration)
  - [3.1. Architecture Design](#31-architecture-design)
  - [3.2. GitHub Actions Workflow](#32-github-actions-workflow)
  - [3.3. Using Ansible to Deploy Application](#33-using-ansible-to-deploy-application)
- [4. Automation](#4-automation)
- [5. Research report](#5-research-report)

## 0. Requirements
- For more information about the project, please take a look at this [link](https://docs.google.com/document/d/1giXBr97e0GVec3Ch18ElYiI_PrbTTqXu6NlX6VnF6v0/edit#heading=h.d18cfdd4km1o) 

## 1. Building a simple 3-Tier web application
- For the interface, I used [Vite](https://vitejs.dev/) to build the web app with [ReactJS](https://reactjs.org/) freamework. The static web files are served by [Nginx](https://www.nginx.com/).
**The source code for interface is [here](https://github.com/helloitsurdvq/VDT2024-webFrontend)**

- For the backend, I used [NodeJS](https://nodejs.org/en) to build the API, connecting to [MongoDB](https://www.mongodb.com/) as the database.
**The source code for backend is [here](https://github.com/helloitsurdvq/VDT2024-api)**

- For the unit test, I used [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) framework.

- **All the Github source code can be found at this [link](https://github.com/helloitsurdvq/VDT2024project).** 
