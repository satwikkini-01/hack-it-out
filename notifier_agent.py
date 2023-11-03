# Import necessary libraries and modules
from uagents import Agent, Context, Model
import httpx
import asyncio
import random
import time
import json
import smtplib
from email.mime.text import MIMEText

smtp_server = 'smtp.gmail.com'
smtp_port = 587
sender_email = 'your_email@gmail.com'
recipient_email = 'recipient@example.com'
password = 'your_password'


# Create a new agent named "disaster_alert"
disaster_alert_agent = Agent(name="disaster_alert")

# Define the base URLs and routes for the server communication
base_url = "http://127.0.0.1:8000/" #Change to local one if running locally
server_url = base_url + "accounts/getuser/"
update_notify = base_url + "accounts/onNotify/"


# Define a data model for user data
class UserData(Model):
    identifier: str
    latitude: float
    longitude: float


# Define an asynchronous function to build a notification based on disaster type
async def build_notification():
    notification = "Disaster ahead!"
    message_templates = [
        "I hope this message finds you well. We would like to inform you about an impending {disaster_type} in your area. Please take immediate action to ensure your safety and the safety of your loved ones. Follow local authorities' instructions and stay tuned to weather updates.",
        "We are reaching out to you with an urgent alert about an approaching {disaster_type}. Your safety is our top priority. Ensure that you have an emergency kit and evacuation plan in place. Stay updated on the storm's progress through local news sources.",
        "We regret to inform you about an approaching {disaster_type}. Please be prepared to evacuate if necessary. Keep important documents and medications readily available and stay informed through emergency alerts.",
        "A {disaster_type} warning has been issued for your area. Seek shelter immediately in a safe and secure location. Ensure your family is aware of the situation and follow safety guidelines.",
        "We want to inform you about the possibility of an {disaster_type} in your area. Secure heavy objects and be ready to take cover. Stay informed about safety measures and local alerts.",
        "A {disaster_type} advisory is in effect for your region. Stay vigilant and be prepared to move to higher ground if necessary. Monitor official communications for updates.",
        "A {disaster_type} has been issued for your area. Ensure you have enough supplies to last through the storm. Stay off the roads if possible and follow weather forecasts.",
        "We have received information about increased {disaster_type} activity in your vicinity. Be prepared for possible ashfall and stay updated on evacuation instructions from local authorities.",
        "We are informing you about a planned power outage in your area. Ensure you have backup lighting, charge your devices, and have essential supplies ready.",
        "There is a public health emergency declaration for your location. Stay informed about health advisories, follow safety guidelines, and take necessary precautions to protect yourself and your community.",
    ]

    # Select a random notification message from the list
    notification = random.choice(message_templates)
    return notification


# Asynchronous function to switch user notifications on or off
async def switch_notification( email, ctx: Context):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(update_notify, json={"user": email})
            if response.status_code == 200:
                return True  # Switch successful
            else:
                ctx.logger.error(f"Switch: Response Failed: {response.text}")
                return False  # Switch failed
    except:
        ctx.logger.error("Failed to switch")
        return False  # Exception occurred, switch failed

# Asynchronous function to send a notification to a specific FCM token
async def send_notification_to_token(email, disastertype, ctx: Context):
    # Create a message with the specified title and body
    body = await build_notification().format(disastertype)
    ctx.logger.info("Sending Notification")
    message = MIMEText(body)
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = 'Emergency mail from GeoCrisis!'
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, recipient_email, message.as_string())
        server.quit()
        print("Notification sent successfully")
        return {"result": True, "data": "Sent"}  # Notification sent successfully
    except Exception as e:
        print("Error sending notification:", str(e))
        return {"result": False, "data": str(e)}  # Error occurred while sending the notification


# Asynchronous function to fetch disaster data based on user's latitude and longitude
async def fetch_disaster(userData: UserData, ctx: Context):
    # Construct the API URL for weather data retrieval
    api_url = "api-url-here" # Use any api url with disaster data
    try:
        async with httpx.AsyncClient() as client:
            # Send a GET request to the weather API
            response = await client.get(api_url)
            data = response.json()
            disaster_type = data["some-logic"]
            # Extract the current disaster from the API response
        ctx.logger.info("Fetch Success")
        
        # Return the disaster data as a dictionary
        return {"result": True, "type": disaster_type}
    except Exception as e:
        # Handle exceptions and log any errors
        ctx.logger.error(f"Error fetching disaster data: {str(e)}")
        return {"result": False, "data": "Failed to fetch disaster"}

# Asynchronous function to alert users based on disaster data and send notifications
async def alert_on_disaster(userData: UserData, ctx: Context):
    # Fetch the current disaster data
    disaster = await fetch_disaster(userData=userData, ctx=ctx)
    
    if disaster["result"]:
        await switch_notification(userData.identifier,  ctx)
        await send_notification_to_token(userData.identifier, disaster["type"], ctx=ctx)


# Asynchronous function to load user data from the server
async def loadUser(ctx: Context):
    userList = []
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(server_url,)
            
            if response.status_code == 200:  # Check if the response status is OK
                try:
                    json_res = response.json()
                    
                    if json_res["result"]:
                        # Extract user data from the JSON response
                        allUserData = json_res["users"]
                        
                        # Iterate through the user data and create UserData objects
                        for user in allUserData:
                            objUser = UserData(
                                identifier=user["identifier"],
                                latitude=user["latitude"],
                                longitude=user["longitude"]
                            )
                            userList.append(objUser)
                        return userList
                    else:
                        ctx.logger.error("Server error: Failed to retrieve user data")
                        return False
                except Exception as json_error:
                    ctx.logger.error(f"Error parsing JSON response: {json_error}")
                    return False
            else:
                ctx.logger.error(f"Server returned status code: {response.status_code}")
                return False
    except Exception as e:
        ctx.logger.error(f"Exception occurred while fetching user data: {e}")



# Schedule the `check_disaster` function to run at regular intervals (every 30 seconds)
@disaster_alert_agent.on_interval(period=30)  
async def check_disaster(ctx: Context):
    # Load user data from the server
    userObjectsList = await loadUser(ctx=ctx)
    
    # Get the current time
    timenow = time.time()
    
    # Create a list to store users that need disaster notifications
    notifyCheckList = userObjectsList
    
    # Send disaster alerts to users in the check list
    for notify in notifyCheckList:
        await alert_on_disaster(notify, ctx)

if __name__ == "__main__":
    
    # Start the disaster_alert_agent
    disaster_alert_agent.run()

