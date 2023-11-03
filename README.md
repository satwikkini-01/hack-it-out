
# GeoCrisis - Real-Time Crisis Mapping Application

GeoCrisis is an innovative and comprehensive real-time mapping application designed to provide immediate and accurate visualization of crises and emergencies worldwide. This platform serves as a crucial tool for both emergency responders and the general public, offering vital information and visual representation of ongoing crises, such as natural disasters, health emergencies, and more.

## Table of Contents
- [About](#about)
  - [What is GeoCrisis](#what-is-geocrisis)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [TECH STACK used](#techstack---built-with)
- [Screenshots](#screenshots)
- [Team](#the-team)

## About
### What is GeoCrisis?
 GeoCrisis is a cutting-edge real-time mapping application meticulously developed to provide instantaneous and comprehensive insights into crises occurring globally. This platform serves as a vital tool for a wide spectrum of users, including emergency responders, governmental bodies, humanitarian organizations, and the general public. Through the amalgamation of advanced technology and real-time data feeds, GeoCrisis aggregates, organizes, and displays ongoing crises, offering a spatial understanding of diverse emergencies, from natural disasters to social conflicts and health crises.

The core purpose of GeoCrisis lies in its ability to centralize and distribute precise information, assisting in decision-making and response coordination during crises. Leveraging an interactive map interface, the application visualizes the geographical distribution and severity of different types of crises.

### Features
 
- **Real-Time Crisis Data**
  - GeoCrisis continuously aggregates and displays updated crisis data in real time, offering crucial information for decision-makers and responders.
  - Uses multiple APIs to collect latest information

- **Map Visualization**
  - The application presents crisis data on an interactive map, providing a geographical context for ongoing emergencies.
  - Uses Leaflet API and Open Street Map API to plot the data on a map.

- **Crisis Categorization**
  - Different crisis types are visually represented with specific symbols or colors
  - Allows users to differentiate between events easily.

- **Alerts and Notifications**
  - The platform sends out alerts and notifications to users based on their geographical location and subscribed preferences, ensuring public awareness.
  - The alerts are sent on the registered email.

- **Data Analysis and Prediction**
  - GeoCrisis analyzes data, identifies patterns, and predicts future crises.
  - Provides predictions for Earthquakes and Floods.
  
- **Integrated AI Chatbot**
  - Has a live chatbot that anyone can chat with.
  - Provides details on natural disasters and also gives solutions to the user's questions.
  - Can also assist someone who is stuck in a crisis.
 
- **Survival Manual**
  - Details on every natural disaster.
  - Provides details on what to do before, during and after a disaster.

- **Emergency Service Locations**
  - Gets the current location of the user and plots all the nearby Hospitals, Police Stations and Fire Stations on a map.
  - Uses Leaflet API and Open Street Map API.
  - Can also be used to provide locations of base camps set up during disaster if the information is provided for the same.


## Getting Started
## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your development environment:

1. **Python**: You'll need Python installed to run backend scripts microagents. You can download Python from the official website [here](https://www.python.org/downloads/).

Make sure all the required paths are added to PATH in environment variables of you PC.

## Installation

Feel free to reach out to us if you have trouble following the guide. Contact details can be found [here](#the-team)

## Running the Server:

1. **Clone the Repository**: Begin by cloning the cli-Mate repository from GitHub to your local machine. This step ensures you have the server's source code.
    ```bash
      git clone https://github.com/satwikkini-01/hack-it-out.git
    ```
    
2. **Change the directory to crisis**: Open the crisis folder.
     ```bash
      cd crisis
    ```
     
3. **Create a Virtual Environment**: It's a good practice to work in a virtual environment to manage dependencies cleanly. Create a virtual environment using your preferred method. For example, you can use Python's `virtualenv` or `venv`.
    While in cloned directory, run
    ```bash
    python -m venv .venv
    ```
    
4. **Activate the Virtual Environment**: Activate the virtual environment to isolate your project's dependencies. This step ensures that you work within a controlled environment for your server.

    - On Windows
      ```bash
      .venv\Scripts\activate
      ```
    - On macOs and Linux
      ```bash
      source .venv/bin/activate
      ```
5. **Install Requirements**: Use `pip` to install the required Python packages specified in the `requirements.txt` file. These packages are essential for the server's proper functioning.

    ```bash
    pip install -r requirements.txt
    ```
6. **Database Migration**: Apply the database migrations. This step ensures that your database schema is up to date.


    ```bash
    python manage.py migrate
    ```
   
7. **Start the Server**: Launch the server with the given command. This action starts the server locally, and it will be accessible at the specified address (usually `http://localhost:8000/`).

    ```bash
    python manage.py runserver
    ```

These steps will help you set up and run both the server smoothly. You're now ready to go!




## TECHSTACK - Built with

[![Tech](https://skillicons.dev/icons?i=html,css,bootstrap,js,python,django)](https://skillicons.dev)

HTML, CSS, BootStrap, JavaScript, Python, Django

APIs: USGS, NASA EONET, Leaflet, OpenStreetMap

## Screenshots
<img width="1163" alt="Screenshot-1" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/f116bf93-0ad2-4629-9f7f-362baef93459">

<img width="1160" alt="Screenshot-2" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/ac082c78-75f9-4e81-9a72-a2dd37fdd39e">

<img width="1159" alt="Screenshot-3" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/d3676feb-4874-45e3-baf6-a96f7db67054">

<img width="1439" alt="Screenshot 2023-11-03 at 1 49 04 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/ab3c0154-b1f7-4eaf-8ab1-5d35597e7040">

<img width="1440" alt="Screenshot 2023-11-03 at 1 49 50 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/a8061c98-5882-4285-a795-d85e1aa1dcd5">

<img width="1440" alt="Screenshot 2023-11-03 at 10 47 58 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/500f5781-f07c-4e4c-8e3a-548b54bba223">

<img width="1440" alt="Screenshot 2023-11-03 at 7 11 43 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/074652f6-cf89-4b03-ab1c-18485ed9cdaf">

<img width="1157" alt="Screenshot-4" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/fc9b9b9d-a8ca-4e5f-874c-15e773888cd4">

<img width="1440" alt="Screenshot 2023-11-03 at 7 15 09 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/29d5e2c1-acff-41e3-9020-eb95f942b52b">

<img width="1160" alt="Screenshot-5" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/1e141ab0-bffa-443d-856d-e49d594a7198">

<img width="1440" alt="Screenshot 2023-11-03 at 7 14 56 PM" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/6b9ee98c-0f39-4a17-b756-c448e5b03123">

<img width="1158" alt="Screenshot-6" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/9f848d82-5b05-4703-887a-206d1703a644">

<img width="1159" alt="Screenshot-7" src="https://github.com/satwikkini-01/hack-it-out/assets/144726232/9a1c49a4-4acd-4fc2-9edb-445a1185f812">

![IMG_6475](https://github.com/satwikkini-01/hack-it-out/assets/144726232/f3ad0fae-c79a-4ac7-b1c8-49f15a878505)
![IMG_6476](https://github.com/satwikkini-01/hack-it-out/assets/144726232/ca394cc5-ff43-4206-a937-b8912c77cc09)
![IMG_6477](https://github.com/satwikkini-01/hack-it-out/assets/144726232/5921e43d-1f1b-4d7d-b4d3-78b9aa06d565)


## The Team:

**Satwik Kini**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/satwikkini-01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/satwik-kini-26a949252/)

**Pranav Anantha Rao**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/PranavRao18)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/pranav-rao-b00926223/)

**Sanath Naik**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/me-sanath)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/sanath-naik/)

**K L Gireesh**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/Gireesh-KL)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/k-l-gireesh-b9b16027b/)
