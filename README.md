# Viettel Digital Talent 2024 - Mini Project
Author: **Đinh Việt Quang**

## Table of Contents 
- [0. Requirements](#0-requirements)
- [1. Building a simple 3-tier web application](#1-building-a-simple-3-tier-web-application)
- [2. Containerization](#2-containerization)
- [3. Continuous Integration](#3-continuous-integration)
- [4. Automation](#4-automation)
- [5. Research report](#5-research-report)
- [6. Kubernetes deployment](#6-kubernetes-deployment)
- [7. K8S helm chart](#7-k8s-helm-chart)
- [8. Continuous delivery](#8-continuous-delivery)
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

## 6. Kubernetes deployment
Minikube is used for the following tasks of the mini project thanks to the convenience setup. 
- First of all, install `kubectl`:
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

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/4.1_k8s_kubectl.jpg)

Next, setup the Minikube
```shell
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

To start the Minikube:
```shell
minikube start
```
To identify the Minikube ip:
```shell
minikube ip
```
The result after successfully installing Minikube:

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/4.2_minikube_complete.jpg)

Minikube ip: [http://192.168.49.2](http://192.168.49.2).
## 7. K8S helm chart
### ArgoCD
First, set up the workspace for the ArgoCD
```shell
kubectl create namespace argocd
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
To switch into NodePort service
```shell
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
```

After that, obtain the password for ArgoCD service
```shell
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
``` 

- All the instructions and command to install the ArgoCD can be found in this [link](https://github.com/argoproj/argo-helm)
- Manifest file can be found [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/argoCDinstall.yml)

The interface of ArgoCD:

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.1_argocd_ui.jpg)
### Helm Chart

The helm chart to deploy web and api service is here:
- [web](https://github.com/helloitsurdvq/VDT2024-webFrontend/tree/main/charts)
- [api](https://github.com/helloitsurdvq/VDT2024-api/tree/main/charts)

The config repository for web and api service:
- [web config](https://github.com/helloitsurdvq/VDT2024-web-config)
- [api config](https://github.com/helloitsurdvq/VDT2024-api-config)

The manifest file for web and api service:
- [web manifest](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/web/charts/manifest.yaml)
- [api manifest](https://github.com/helloitsurdvq/VDT2024project/blob/main/app/api/charts/manifest.yaml)

The Screenshot of the ArgoCD system interface on the browser

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.2_argo_web.jpg)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.3_argo_api.jpg)


- The website can be accessed at [http://192.168.49.2:30080/](http://192.168.49.2:30080/).
- The api can be accessed at [ http://192.168.49.2:30081/]( http://192.168.49.2:30081/).

Small screenshot of browser screen when accessing Web URL, API URL at [http://192.168.49.2:30080/](http://192.168.49.2:30080/) and [http://192.168.49.2:30081/api/trainee](http://192.168.49.2:30081/api/trainee):

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.2_argo_web_demo.jpg)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.6_argo_api_ui.png)

## 8. Continuous delivery 
GitHub Action CD setup file for web and api service can be found here:
- [webCD.yaml](https://github.com/helloitsurdvq/VDT2024-webFrontend/blob/main/.github/workflows/cd.yaml)
- [apiCD.yaml](https://github.com/helloitsurdvq/VDT2024-api/blob/main/.github/workflows/cd.yaml)

Output log of the CD workflow:
- [webCD.log](https://github.com/helloitsurdvq/VDT2024-webFrontend/blob/main/.github/workflows/webCD.log)
- [apiCD.log](https://github.com/helloitsurdvq/VDT2024-api/blob/main/.github/workflows/apiCD.log)

ArgoCD's history image when there are changes in web config repo and api config repo:

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.7_argo_diff_web.png)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/5.8_argo_diff_api.png)

## 9. Monitoring
**Overview**: Prometheus is an open-source monitoring and alerting toolkit, which is designed for reliability and scalability. By using the Prometheus Operator, we can simplify the deployment and management of Prometheus in a Kubernetes cluster.

**Prerequisites**
- A running Kubernetes cluster.
- kubectl command-line tool configured to interact with your cluster.
- helm package manager installed.
- minikube for local Kubernetes development (optional).

**Deployment steps**
```shell
# 1. Add the Prometheus Helm Repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
# 2. Install Prometheus
helm install prometheus prometheus-community/prometheus
# 3. Install Prometheus Operator which will manage the Prometheus instances and configurations within the cluster
helm install prometheus-operator prometheus-community/kube-prometheus-stack
# 4. Expose the Prometheus service
kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext
# 5. Access the Prometheus UI
minikube service prometheus-server-ext
```
The outcome of the Prometheus setup:

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/7.1_prometheus_ui.jpg)

Prometheus website is set up at [http://192.168.49.2:31892](http://192.168.49.2:31892).

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/7.2_prometheus_link.jpg)
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

The HAproxy config file can be found [here](https://github.com/helloitsurdvq/VDT2024project/blob/main/haproxy/haproxy.cfg).

The address to access the website will be:
- web: [https://192.168.227.48:3001/](https://192.168.227.48:3001/)
- api: [https://192.168.227.48:8081/](https://192.168.227.48:8081/) 

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.1.1_security_haproxy_web.jpg)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.1.2_security_haproxy_api.png)
### Authentication
All the work is located in [api repository](https://github.com/helloitsurdvq/VDT2024-api).

The documentation for this issue can be found [here](https://github.com/helloitsurdvq/VDT2024-api/blob/main/authentication.md).

HTTP Response results when using postman to call URLs when not passing authentication (without jwt):

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.7_security_notoken.jpg)

Login process and HTTP Response results when using postman to call URLs when passing authentication (with jwt):

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.1_security_login_admin.jpg)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.8_security_withtoken.jpg)

Route authorization details can be summarized as followed:
- Admin gains full access to all CRUD operations, while Trainee is strictly limited to read-only access (GET requests) and forbidden from creating, updating, or deleting resources.
- `authMiddleware`: Must be authenticated.
- `roleMiddleware`: Requires role-based authorization.
- GET `/` (Get all trainees): Accessible to everyone without authentication.
- GET `/:id` (Get one trainee): Requires the user to be authenticated (logging in), no role-specific restrictions are applied; both trainee and admin roles can access this endpoint.
- POST `/` (Create a new trainee), PUT `/:id` (Update a trainee), DELETE `/:id` (Delete a trainee): Requires the user to be authenticated, allows `admin` to create, update, delete a new trainee and forbids `trainee` from doing these things.

```javascript
const express = require('express');
const traineeController = require("../controllers/traineeController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');
const router = express.Router();

router.use(rateLimitMiddleware);

router.get("/", traineeController.getAllTrainees);
router.get("/:id", authMiddleware, traineeController.getOneTrainee);
router.post("/", authMiddleware, roleMiddleware, traineeController.saveTrainee);
router.put("/:id", authMiddleware, roleMiddleware, traineeController.updateTrainee);
router.delete("/:id", authMiddleware, roleMiddleware, traineeController.deleteTrainee);

module.exports = router;
```
Some examples:
- Everyone can view trainee list

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.2_security_getall.jpg)

- Only admin can add new trainee

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.4_security_savetrainee_fail.jpg)

- Trainee can view a trainee.

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.5_security_gettrainee_success.jpg)

- Trainee are not alllowed to delete resources

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.2.6_security_deletetrainee_fail.jpg)
### Endpoint rate limitation
The documentation for this issue can be found [here](https://github.com/helloitsurdvq/VDT2024-api/blob/main/rateLimitation.md).

To implement rate limiting strategy for the api service, the `express-rate-limit` are used. This package primarily uses implementation that can be considered as a combination of the **token bucket** and **leaky bucket** algorithms. It provides the following features:

- *Fixed Window Counter*: tracks the number of requests in a fixed time window (e.g., 1 minute). When the window expires, the count resets.
- *Sliding Window Counter*: can be configured to track requests in a sliding window, providing a more dynamic view of the request rate.
- *Burst Handling*: by setting the 'max' value, the middleware can handle bursts of traffic up to the specified limit within the given time window (windowMs).

This middleware allows to set up rate limiting rules easily, helps to ensure that the application can handle a high volume of requests without getting overwhelmed.

```shell
# Install package
npm install express-rate-limit
```

The source code to deal with the issue can be found [here](https://github.com/helloitsurdvq/VDT2024-api).

```javascript
const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  handler: (req, res) => {
    res.status(409).send({ message: 'Too many requests, please try again later.' });
  },
});

module.exports = rateLimitMiddleware;
```
Explain:
- `windowMs` specifies the duration of the time window.
- `max` specifies the maximum number of requests allowed within the time window.
- `handler` is a custom response when the rate limit is exceeded.
- Usage: The configured middleware is exported and can be applied to the application or specific routes to enforce rate limiting.

```javascript
const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');
const router = express.Router();

router.use(rateLimitMiddleware);

module.exports = router;
```

If the limit is exceeded, the client will receive a `409 Conflict` response. This helps in preventing abuse and managing traffic effectively.

The outcome when testing on Postman:

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.3_security_manyreqs.jpg)

![img](https://raw.githubusercontent.com/helloitsurdvq/VDT2024project/main/assets/9.4_security_manyreqs_log.png)