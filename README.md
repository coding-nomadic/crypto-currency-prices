## currency-conversion-service

This application is built using python framework (Flask) which internally uses free currency converter API [link ](https://apilayer.com/marketplace/exchangerates_data-api). 

This service also calls one API to convert from INR to EUR and sends message to Kakfa Topic, to show the real time integration on Dashboard UI which will be built in using react JS, chart JS and material UI. There should be a 

local instance Apache Kafka running on - 

```
http://localhost:9092
```

## Prerequisite for the Apache Kafka - 

Download the zip and install by referring this [link](https://www.geeksforgeeks.org/how-to-install-and-run-apache-kafka-on-windows/)

Inside the Kafka folder run this command to create a topic - 

```
.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic currency-topic
```




