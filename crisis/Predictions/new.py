import pandas as pd
# import numpy as np
# from matplotlib import pyplot as plt
# from sklearn.preprocessing import PolynomialFeatures
# from sklearn.linear_model import LinearRegression
# from sklearn.svm import SVR

from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
import os

data = pd.read_csv(os.path.join('Predictions','database.csv'))
backup = data.copy()

data = data[['Date', 'Time', 'Latitude', 'Longitude', 'Depth', 'Magnitude']]

import datetime
import time

# timestamp = []
# for d, t in zip(data['Date'], data['Time']):
#     try:
#         ts = datetime.datetime.strptime(d+' '+t, '%m/%d/%Y %H:%M:%S')
#         timestamp.append(time.mktime(ts.timetuple()))
#     except ValueError:
#         # print('ValueError')
#         timestamp.append('ValueError')

# timeStamp = pd.Series(timestamp)
# data['Timestamp'] = timeStamp.values
final_data = data.drop(['Date', 'Time'], axis=1)
final_data = final_data[final_data.Timestamp != 'ValueError']
#print(final_data.head())


X = final_data[['Timestamp', 'Latitude', 'Longitude']]
y = final_data[['Magnitude', 'Depth']]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#print(X_train.shape, X_test.shape, y_train.shape, X_test.shape)

reg = RandomForestRegressor(random_state=43)
reg.fit(X_train, y_train)
reg.predict(X_test)

t = int(time.time())

def quake_predict(lat,long):
    ans = reg.predict([[t,lat,long]])
    return ans[0][0]
''' Format Below'''

## reg.predict([[timestamp,lat,long]]) ##






#print(reg.score(X_test, y_test))
# print(reg.predict([[198925836,14.23,74.00]]))

# from keras.models import Sequential
# from keras.layers import Dense

# def create_model(neurons, activation, optimizer, loss):
#     model = Sequential()
#     model.add(Dense(neurons, activation=activation, input_shape=(3,)))
#     model.add(Dense(neurons, activation=activation))
#     model.add(Dense(2, activation='softmax'))
    
#     model.compile(optimizer=optimizer, loss=loss, metrics=['accuracy'])
    
#     return model

# from keras.wrappers.scikit_learn import KerasClassifier

# model = KerasClassifier(build_fn=create_model, verbose=0)

# # neurons = [16, 64, 128, 256]
# neurons = [16]
# # batch_size = [10, 20, 50, 100]
# batch_size = [10]
# epochs = [10]
# # activation = ['relu', 'tanh', 'sigmoid', 'hard_sigmoid', 'linear', 'exponential']
# activation = ['sigmoid', 'relu']
# # optimizer = ['SGD', 'RMSprop', 'Adagrad', 'Adadelta', 'Adam', 'Adamax', 'Nadam']
# optimizer = ['SGD', 'Adadelta']
# loss = ['squared_hinge']

# param_grid = dict(neurons=neurons, batch_size=batch_size, epochs=epochs, activation=activation, optimizer=optimizer, loss=loss)