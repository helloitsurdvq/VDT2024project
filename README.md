# Viettel Digital Talent 2024 - Mini Project
Author: **Đinh Việt Quang**

## Table of Contents 
- [0. Requirements](#0-requirements)
- [1. Building a simple 3-tier web application](#1-building-a-simple-3-tier-web-application)
- [2. Containerization](#2-containerization)
- [3. Continuous Integration](#3-continuous-integration)
- [4. Automation](#4-automation)
- [5. Research report](#5-research-report)
- [6. Kubernetes deploying](#6-kubernetes-deploying)
- [7. K8S Helm Chart](#7-k8s-helm-chart)
- [8. Continuous Delivery](#8-continuous-delivery)
- [9. Monitoring](#9-monitoring)
- [10. Logging](#10-logging)
- [11. Security](#11-security)

## 0. Requirements
- For more information about the project, please take a look at this [link](https://docs.google.com/document/d/1giXBr97e0GVec3Ch18ElYiI_PrbTTqXu6NlX6VnF6v0/edit#heading=h.d18cfdd4km1o).

## 1. Building a simple 3-tier web application
- For the interface, I used [Vite](https://vitejs.dev/) to build the web app with [ReactJS](https://reactjs.org/) freamework. The static web files are deployed by [Nginx](https://www.nginx.com/).
**The source code for interface is [here](https://github.com/helloitsurdvq/VDT2024-webFrontend)**.

- For the backend, I used [NodeJS](https://nodejs.org/en) to build the API, connecting to [MongoDB](https://www.mongodb.com/) as the database.
**The source code for backend is [here](https://github.com/helloitsurdvq/VDT2024-api)**.

- For the unit test, I used [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) framework which avoided interaction with the database. The testing source code can be found [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/api/test/trainee.js).

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
Technique such as multi-stage build and layer caching are used for Dockerfile to optimize the size and building time for images. To run multiple containers for convenience, run this command in the `web` folder path:
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
Once the  `docker compose` has been executed, the application can be visited at [http://localhost:8080/](http://localhost:8080/) and there will be 3 containers running:  
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/1.9_docker_container.jpg)

## 3. Continuous Integration
- GitHub Action CI setup file: [link](https://github.com/helloitsurdvq/VDT2024project/blob/main/.github/workflows/ci.yaml)

- Output log of the CI workflow: [link](https://github.com/helloitsurdvq/VDT2024project/blob/main/.github/workflows/ci.log)

- Push commit CI testing demo:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/2.1_ci_demo_pushcommit.jpg)

- Pull request CI testing demo:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/2.2_ci_demo_pullrequest.jpg)

## 4. Automation
- To use the playbook, there are two main files to work with, namely `ansible/inventory.yml` and `ansible/playbook.yml`
  - `ansible/inventory.yml`: contains the list of hosts that an user wants to apply to the playbook, in my project, I interacted with *two hosts*, namely **localhost** and **hosttestusr1**.
  - `ansible/playbook.yml`: the main playbook file that contains all the tasks to be executed.
  - `ansible/roles`: This folder contains all roles for the playbook to deal with. Each role includes the tasks to be executed in `tasks/main.yml` and the defaults variables list in `vars/main.yml`.
- Source code for the ansible playbooks can be found [here](https://github.com/helloitsurdvq/VDT2024project/tree/main/ansible).
- To deploy the application from the beginning:
```shell
ansible-playbook -i inventory.yml playbook.yml
```
- The full output log is [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/ansible/ansible.log), the partial result is shown in this:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/3.1_ansible_multihost.jpg)

- The output in the localhost:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/3.2_ansible_localhost.jpg)

- The output in the hosttestusr1:
![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/3.3_ansible_hosttestusr1.jpg)

## 5. Research report
- My research work is related to **[the security issue of the Docker container](https://github.com/helloitsurdvq/VDT2024project/blob/main/docs/DinhVietQuang-research.pdf)**.

## 6. Kubernetes deploying
Minikube is used for the following tasks of the mini project. 
- First of all, Install kubectl:
```shell
# Download the latest release
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
# Validate the binary
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
# Install kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Check the version after installed:
```shell
kubectl version --client
```

The output:


Next, setup the Minikube
```shell
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

To start the Minikube
```shell
kubemini start
```

The result after successfully installing Minikube:

## 7. K8S helm chart
### ArgoCD
- All the instructions and command to install the ArgoCD can be found in this [link](https://github.com/argoproj/argo-helm)
- Manifest file can be found [here]()
- The interface of ArgoCD:
### Helm Chart

The helm chart for to deploy web and api is here
- [web]()
- [api]()

The config repository for web and api service:
- [web config](https://github.com/helloitsurdvq/VDT2024-web-config)
- [api config](https://github.com/helloitsurdvq/VDT2024-api-config)

The manifest file for web and api service:
- [web manifest]()
- [api manifest]()

The Screenshot of the ArgoCD system interface on the browser

![img]()

- The website can be accessed at [http://192.168.49.2:30080/](http://192.168.49.2:30080/). The manifest file for web deployment can be found [here]()
- The api can be accessed at [ http://192.168.49.2:30081/]( http://192.168.49.2:30081/). The manifest file for api deployment can be found [here]()

Screenshot of browser screen when accessing Web URL, API URL
## 8. Continuous delivery 
GitHub Action CD setup file for web and api service can be found here:
- [webCD.yaml](https://github.com/helloitsurdvq/VDT2024-webFrontend/blob/main/.github/workflows/cd.yaml)
- [apiCD.yaml](https://github.com/helloitsurdvq/VDT2024-api/blob/main/.github/workflows/cd.yaml)

Output log of the CD workflow
- [webCD.log](https://productionresultssa6.blob.core.windows.net/actions-results/ca0675db-67ec-45e6-a1b9-b650e1c4f46a/workflow-job-run-1c8ce01e-97de-5be9-a863-648419f09741/logs/job/job-logs.txt?rsct=text%2Fplain&se=2024-06-11T10%3A32%3A58Z&sig=EZhv5lIzAEUc13UUgfExn92h%2BhGC4HBrBx8gLbcSILc%3D&ske=2024-06-11T20%3A29%3A07Z&skoid=ca7593d4-ee42-46cd-af88-8b886a2f84eb&sks=b&skt=2024-06-11T08%3A29%3A07Z&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skv=2023-11-03&sp=r&spr=https&sr=b&st=2024-06-11T10%3A22%3A53Z&sv=2023-11-03)
- [apiCD.log](https://productionresultssa6.blob.core.windows.net/actions-results/ca0675db-67ec-45e6-a1b9-b650e1c4f46a/workflow-job-run-1c8ce01e-97de-5be9-a863-648419f09741/logs/job/job-logs.txt?rsct=text%2Fplain&se=2024-06-11T10%3A34%3A10Z&sig=tKnJG%2Fzb81CEVaTsEHp1bL0VnhHhJpdyMsetQwBeeHI%3D&ske=2024-06-11T21%3A43%3A10Z&skoid=ca7593d4-ee42-46cd-af88-8b886a2f84eb&sks=b&skt=2024-06-11T09%3A43%3A10Z&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skv=2023-11-03&sp=r&spr=https&sr=b&st=2024-06-11T10%3A24%3A05Z&sv=2023-11-03)

ArgoCD's history image when there are changes in web config repo and api config repo

![img]()
## 9. Monitoring
```shell
# Add the repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install prometheus prometheus-community/prometheus

helm install prometheus-operator prometheus-community/kube-prometheus-stack
# Expose the service
kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext
# Expose nodePort
minikube service prometheus-server-ext
```
The outcome of the Prometheus setup:

![img]()

## 10. Logging
(To be continued)
## 11. Security
### HAProxy Load balancer
```shell
# Generate a Self-Signed Certificate
openssl req -x509 -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.crt -days 365

# Create the Directory 
sudo mkdir -p /etc/ssl/private

# Move the Certificate and Key Files
sudo mv example.com.key /etc/ssl/private/
sudo mv example.com.crt /etc/ssl/private/

# Combine Certificate and Key into a PEM File
sudo sh -c 'cat /etc/ssl/private/example.com.crt /etc/ssl/private/example.com.key > /etc/ssl/private/example.com.pem'

# Set Permissions
sudo chmod 640 /etc/ssl/private/example.com.pem
sudo chown root:haproxy /etc/ssl/private/example.com.pem

# Run service
systemctl restart haproxy.service

# Check status
systemctl status haproxy.service
```

The HAproxy config file can be found [here]()

The address to access the website will be:
- web: [https://192.168.227.48:3001/](https://192.168.227.48:3001/)
- api: [https://192.168.227.48:8081/](https://192.168.227.48:8081/) 

![img]()

![img]()
### Authentication

### Endpoint rate limitation
To implement rate limiting for the api service, the `express-rate-limit` are used. This middleware allows to set up rate limiting rules easily.

```shell
# Install package
npm install express-rate-limit
```

The source code to deal with the issue can be found [here]()

If the limit is exceeded, the client will receive a `409 Conflict` response. This helps in preventing abuse and managing traffic effectively.