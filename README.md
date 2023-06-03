# Smart parking lot system prototype

## Install required dependensies 
```npm install```

```pip install requirements.txt```


## Start server

Run rails server on local network at port 5500 
```rails server -b 0.0.0.0 -p 5500```

If you change the port number, make sure to update the port number in ```/frontend/api.js```

Hardware components such as raspberry Pi should also be connected to the local network.


## Start frontend

Move to the frontend directory
```cd /frontend```

```npm run start```

## Hardware
- Raspberry Pi 4B
- Raspberry Pi Camera Module
- Micro Servomotor SG-90
- OLED Display SSD1306
- 8 Red Mini LEDs

## Libraries for Hardware Control System
```pip install requests```

```pip intsall luma.oled```

```pip install serial```

```pip install maskpass```

## Product

<img style="width: 60%" src="/images/image1.jpg" title="Parking lot top view">

<img style="width: 60%" src="/images/image2.jpg" title="Parking lot top view">
<img style="width: 60%" src="/images/image4.jpg" title="Parking lot top view">
<img style="width: 60%" src="/images/parkinglotcircuitdiagram.png" title="Circuit Diagram">
<img style="width: 60%" src="/images/IMG_7398.JPG" title="Circuit Picture">

