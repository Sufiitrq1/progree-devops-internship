# Progree DevOps Internship

This repository contains the completed tasks for the Progree DevOps internship program. It includes a containerized Node.js application, an automated CI/CD pipeline, and a full Kubernetes deployment with supporting Infrastructure as Code for AWS EKS.

## Project Overview

The application is a minimal Express.js API used as the base for demonstrating containerization, automated testing, continuous integration, and container orchestration practices.

## Task 1: LinkedIn Announcement

The internship acceptance was announced on LinkedIn with the official offer letter, a description of learning goals for the internship, a tag to Progree, and the hashtags devops, docker, cicd, and progree.

## Task 2: Application Containerization

The application is built using a multi stage Dockerfile.

* Stage one installs dependencies and prepares the application.
* Stage two copies only the required files into a minimal Node.js Alpine runtime image, which keeps the final image size small.
* The container runs as a non root user for improved security.
* Environment variables such as NODE_ENV and PORT are set through the Dockerfile and can be overridden securely at runtime using an env file, which is excluded from version control.
* The application listens on port 3000, which is exposed and mapped when the container runs.

Relevant files:
* Dockerfile
* .dockerignore

## Task 3: CI/CD Pipeline

A GitHub Actions workflow automatically runs on every push and pull request to the main branch.

The pipeline performs the following steps.

1. Checks out the repository code.
2. Installs Node.js dependencies.
3. Runs ESLint to check code quality.
4. Runs Jest tests to verify application behavior.
5. Logs a status message confirming the lint and test results.
6. Builds the Docker image once lint and tests pass successfully.
7. Logs a status message confirming the Docker build result.

Relevant file:
* .github/workflows/ci-cd.yml

## Task 4: Infrastructure as Code and Orchestration

This task provisions and deploys the application on Kubernetes and includes Terraform configuration for provisioning an EKS cluster on AWS.

### Kubernetes Deployment (Minikube)

The application was deployed and tested locally using Minikube to validate the full orchestration setup without requiring an AWS account.

Kubernetes resources included:

* Deployment: runs two replicas of the application with resource requests and limits, along with liveness and readiness probes using the application health endpoint.
* Service: exposes the deployment internally on port 80 and routes traffic to the application on port 3000.
* Ingress: configured with an NGINX ingress controller to route external requests to the application.
* Persistent Volume Claim: provisions one gigabyte of storage bound to the application.
* Horizontal Pod Autoscaler: automatically scales the application between two and five replicas based on CPU utilization, targeting seventy percent average usage.

Relevant files:
* k8s/deployment.yaml
* k8s/service.yaml
* k8s/ingress.yaml
* k8s/pvc.yaml
* k8s/hpa.yaml

### Infrastructure as Code (Terraform for AWS EKS)

Terraform configuration was written and validated to provision the same application on AWS EKS. This includes a dedicated VPC with public subnets across two availability zones, an internet gateway and route table for network access, and an EKS cluster with a managed node group.

The configuration was validated using terraform init and terraform validate to confirm correctness, and is ready to be applied when AWS credentials are available.

Relevant file:
* terraform/main.tf

## Repository Structure

```
progree-devops-internship/
  .github/workflows/ci-cd.yml
  k8s/
    deployment.yaml
    service.yaml
    ingress.yaml
    pvc.yaml
    hpa.yaml
  terraform/
    main.tf
  Dockerfile
  .dockerignore
  .gitignore
  server.js
  server.test.js
  eslint.config.mjs
  package.json
```

## Running the Project Locally

### Run the application directly

```
npm install
npm start
```

The application will be available at http://localhost:3000

### Run tests and linting

```
npm run lint
npm test
```

### Build and run the Docker container

```
docker build -t progree-task2:latest .
docker run -d -p 3000:3000 --env-file .env --name progree-app progree-task2:latest
```

### Deploy to Minikube

```
minikube start --driver=docker --cpus=2 --memory=4096
minikube addons enable ingress
minikube addons enable metrics-server
minikube image load progree-task2:latest

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/hpa.yaml

kubectl get pods
kubectl get svc
kubectl get ingress
kubectl get pvc
kubectl get hpa
```

### Validate Terraform configuration

```
cd terraform
terraform init
terraform validate
```

## Author

Muhammad Sufiyan Tariq---
DevOps and Cloud Infrastructure Engineer
