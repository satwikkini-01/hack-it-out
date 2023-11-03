import pandas as pd
import numpy as np  
import matplotlib.pyplot as plt  
from sklearn.model_selection import train_test_split  
from sklearn.linear_model import LinearRegression  
from sklearn.metrics import r2_score
# %matplotlib inline

df_rain = pd.read_csv("Predictions/rainfall.csv")
# print(df_rain.head())

df_rain.plot(x='Date/Time', y='Cumulative rainfall (mm)', style='o')  

# plt.title('Rainfall')  
# plt.xlabel('Date')  
# plt.ylabel('Rainfall in mm')  
# plt.show()  

df_river = pd.read_csv("Predictions/river.csv")

# df_river.plot(x='Date/Time', y='Level (m)', style='o')  
# plt.title('River Level')  
# plt.xlabel('Date')  
# plt.ylabel('Max Level')  
# plt.show()  


#df_river["Date/Time"] = df_river["Date/Time"].str.replace("00:00", "")
df = pd.merge(df_rain, df_river, how='outer', on=['Date/Time'])

# df.plot(x='Cumulative rainfall (mm)', y='Level (m)', style='o')  
# plt.title('River Level')  
# plt.xlabel('Rainfall')  
# plt.ylabel('Max Level')  
# plt.show()  

df['Cumulative rainfall (mm)'] = df['Cumulative rainfall (mm)'].fillna(0)
df['Level (m)'] = df['Level (m)'].fillna(0)
df = df.drop(columns=['Current rainfall (mm)', 'Date/Time'])

X = df.iloc[:, :1].values
y = df.iloc[:, 1:2].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0) 
regressor = LinearRegression()  
regressor.fit(X_train, y_train) 
y_pred = regressor.predict(X_test) 

rainfall = [[250]]

predLvl = regressor.predict(rainfall)
# print(predLvl)

if(predLvl > 5):
  print("These is a high chance of Flood in your location.")
elif(predLvl > 3.5):
  print("There is a good chance of Flood in your location.")
elif(predLvl > 1.5):
  print("There is a mild chance of Flood in your location.")
else:
  print("There is nearly no chance of Flood in your location.")

def flood_predict():
  message = ""
  return message