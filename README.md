# Viettel Digital Talent 2024 - Mini Project
Author: **Đinh Việt Quang**

## Table of Contents 
- [0. Requirements](#0-requirements)
- [1. Building a simple 3-tier web application](#1-building-a-simple-3-tier-web-application)
- [2. Containerization](#2-containerization)
- [3. Continuous Integration](#3-continuous-integration)
  <!-- - [3.1. Architecture Design](#31-architecture-design)
  - [3.2. GitHub Actions Workflow](#32-github-actions-workflow) -->
- [4. Automation](#4-automation)
- [5. Research report](#5-research-report)

## 0. Requirements
- For more information about the project, please take a look at this [link](https://docs.google.com/document/d/1giXBr97e0GVec3Ch18ElYiI_PrbTTqXu6NlX6VnF6v0/edit#heading=h.d18cfdd4km1o) 

## 1. Building a simple 3-tier web application
- For the interface, I used [Vite](https://vitejs.dev/) to build the web app with [ReactJS](https://reactjs.org/) freamework. The static web files are deployed by [Nginx](https://www.nginx.com/).
**The source code for interface is [here](https://github.com/helloitsurdvq/VDT2024-webFrontend)**

- For the backend, I used [NodeJS](https://nodejs.org/en) to build the API, connecting to [MongoDB](https://www.mongodb.com/) as the database.
**The source code for backend is [here](https://github.com/helloitsurdvq/VDT2024-api)**

- For the unit test, I used [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) framework which avoided interaction. The testing source code can be found [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/api/test/trainee.js)

- **All the Github source code can be found at this [link](https://github.com/helloitsurdvq/VDT2024project).** 

### Output
- The page
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.1_crud_ui.jpg) 
- View trainee
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.2_crud_view.jpg)
- Create trainee
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.3_crud_create.jpg)
- Update trainee
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.4_crud_update.jpg)
- Delete trainee
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.5_crud_delete.jpg)
- Unit test
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.8_unittest.jpg)

## 2. Containerization
Technique such as multi-layering are usedfor Dockerfile to optimize the size and building time for images. To run multiple containers for convenience, use this command in the `web` folder:
```shell
docker compose up -d
```
### Web
- [Dockerfile](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/web/Dockerfile)

Build command:
```shell
docker build -t web . | tee web_build.log
```
Output log of the `docker history` command can be found **[here](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/web/web_history.log)** by using this command:
```shell
docker history web | tee web_history.log
```
### API
- [Dockerfile](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/api/Dockerfile)

Build command:
```shell
docker build -t api . | tee api_build.log
```
Output log of the `docker history` command can be found **[here](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/api/api_history.log)** by using this command:
```shell
docker history api | tee api_history.log
```
## 3. Continuous Integration
- GitHub Action CI setup file: [link](https://github.com/helloitsurdvq/VDT2024project/blob/main/.github/workflows/ci.yaml)

- Output log of the CI workflow: [link](https://github.com/helloitsurdvq/VDT2024project/blob/main/.github/workflows/ci.log)

- Push commit CI testing demo:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/2.1_ci_demo_pushcommit.jpg)

- Pull request CI testing demo:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/2.2_ci_demo_pullrequest.jpg)

## 4. Automation
- Source code for the ansible playbooks can be found [here].(https://github.com/helloitsurdvq/VDT2024project/tree/main/ansible)
- To deploy the application from the beginning:
```shell
ansible-playbook -i inventory.yml playbook.yml
```
- The output log is [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/ansible/ansible.log)
# 5. Research report
- My research work is related to **[the security of the Docker container](https://github.com/helloitsurdvq/VDT2024project/blob/main/docs/DinhVietQuang-research.pdf)**.