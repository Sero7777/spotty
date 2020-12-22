# Spotty 
This is a prototype of an application where users are able to create entries (so called spots) of various places they were at. Created spots can be displayed on a map or in a list view.

## Motivation

The reason for creating this application was to being able to implement and test various types of communication between clients and servers as WebSockets, Server Sent Events and Long Polling/Polling. Therefore, the focus lies on implementing the different types of communication instead of perfectly written code.

## Functionalities

- Create, Update, Delete Spots
- Create, Update, Delete Comments
- Register, Login
- Display Spots on a Map, Display Spots in a List
- Support for Polling, Long Polling, Server Sent Events, WebSockets

## Architecture

![Architecture](https://user-images.githubusercontent.com/47899469/102883390-3dcf4b80-4450-11eb-8374-84a35fba1c00.png "Architecture")

![Frontend Architecture](https://user-images.githubusercontent.com/47899469/102883440-50e21b80-4450-11eb-9427-8dc21dad706a.png "Frontend Architecture")

## Technologies used

- TypeScript/JavaScript
- Node.js, Express
- MongoDB
- NATS Streaming
- Github Actions
- Docker
- Kubernetes
- React
- Redux
- SASS


## Installation guide (MacOS)


### 1) Install docker
Download Docker  (https://www.docker.com/products/docker-desktop)  and install it.

### 2) Activate local Single Node Kubernetes-Cluster

Click on the Docker icon in the mac menu bar. Go to Preferences > Kubernetes > Enable Kubernetes

Verify that you have activated it by typing in kubectl in your terminal. If any errors are thrown, Kubernetes has probably not been installed properly.

### 3) Install Skaffold

Download and install skaffold: https://skaffold.dev/docs/install/

After installing skaffold, type skaffold in the terminal to verify the installation. If the following error occurs: 

>Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post https://ingress-nginx-controller-admission.ingress-nginx.svc:443/extensions/v1beta1/ingresses?timeout=30s: x509: certificate signed by unknown authority
>

you should enter the following command:

> kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

and start the installation process again.

### 4) Create Secrets

For using JSON Web Tokens (JWT) you have to create a secret that will be accessed in the code via environment variables. As we do not want the secret to show up in the repository, we have to create it by hand. All other environment variables used are not critical and can be exposed publicly. They are directly created via the config files used for Kubernetes.

> kubectl create secret generic jwt-secret —from-literal=JWT_SECRET=dasdasdas

If any errors occur, you can also try to type the command by hand instead of copying it as some encoding problems may occur doing this.

To make sure that the secret has successfully been created, type 

>kubectl get secrets 

in the terminal and check wether a new secret with the name "jwt-secret" is displayed.

### 5) Install the Ingress-Nginx Controller

An ingress-controller is used in this project that acts as a reverse proxy and as a load balancer simultaneously.

Go to https://kubernetes.github.io/ingress-nginx/deploy/ and follow the installation guidelines for your corresponding OS. Example for MacOS: 

> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml

Now we have to use a workaround to make everything work: We have to define a domain-name in the ingress-controller config so that the requests directed to this domain will be forwarded to the correct microservice. Unfortunately, we cannot use localhost here so we do the following:

If you are using Mac/Linux you access the hosts file (/etc/hosts) via an editor of your choise and add the following:

> 127.0.0.1 spotty.com

Save the file. Now the OS will route all requests addressed to spotty.com automatically to localhost.

### 6) Start the project

Pull the code from Github and open your terminal. Go to the project of your choice via the terminal (Polling, Long Polling SSE, Websockets) and enter 

> skaffold dev

By doing so, all container will automatically be built and deployed to the Kubernetes cluster. If you want to stop the running project, type in Ctrl+C.
