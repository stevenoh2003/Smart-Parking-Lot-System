import RPi.GPIO as GPIO
import time
import requests
import maskpass
from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import ssd1306
from PIL import Image, ImageFont, ImageDraw, ImageOps
import os

url = 'http://172.20.10.3:5500/api/v1/parking_spaces'
response = requests.get(url)

if response.status_code == 200:
    users = response.json()

else:
    print('Error:', response.status_code)

class ssd1306_oled(object):
    def __init__(self, i2c_address = 0x3C):
        #initial settings (i2caddress, product type, ttf file,and font)
        self.serial = i2c(port = 1, address = i2c_address)
        self.device = ssd1306(self.serial)
        self.ttf = '/usr/share/fonts/truetype/noto/NotoMono-Regular.ttf'
        self.font = ImageFont.truetype(self.ttf, 22)

    def drawMessage(self, message):
        #display text
        with canvas(self.device) as drawUpdate:
            drawUpdate.text((7, 2), message, font = self.font, fill = 100)

def getDataByPassword(password):
    #get userdata (username, userid, password) from input password
    for user in users:
        if user['password'] == password:
            return user
    return 0

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

def charlieplex(val1, val2, val3, val4):
    #GPIO pin 18
    if val1 == -1:
        GPIO.setup(18, GPIO.IN)
    elif val1 == 1:
        GPIO.setup(18, GPIO.OUT)
        GPIO.output(18, True)
    elif val1 == 0:
        GPIO.setup(18, GPIO.OUT)
        GPIO.output(18, False)
    #GPIO pin 23
    if val2 == -1:
        GPIO.setup(23, GPIO.IN)
    elif val2 == 1:
        GPIO.setup(23, GPIO.OUT)
        GPIO.output(23, True)
    elif val2 == 0:
        GPIO.setup(23, GPIO.OUT)
        GPIO.output(23, False)
    #GPIO pin 24
    if val3 == -1:
        GPIO.setup(24, GPIO.IN)
    elif val3 == 1:
        GPIO.setup(24, GPIO.OUT)
        GPIO.output(24, True)
    elif val3 == 0:
        GPIO.setup(24, GPIO.OUT)
        GPIO.output(24, False)
    #GPIO pin 8
    if val4 == -1:
        GPIO.setup(8, GPIO.IN)
    elif val4 == 1:
        GPIO.setup(8, GPIO.OUT)
        GPIO.output(8, True)
    elif val4 == 0:
        GPIO.setup(8, GPIO.OUT)
        GPIO.output(8, False)

def lightup(ledvalue):
    #charlieplexing truth table for the LEDs
    if ledvalue == 1:
        charlieplex(1,0,-1,-1)
    elif ledvalue == 2:
        charlieplex(0,1,-1,-1)
    elif ledvalue == 3:
        charlieplex(-1,1,0,-1)
    elif ledvalue == 4:
        charlieplex(-1,0,1,-1)
    elif ledvalue == 5:
        charlieplex(-1,-1,1,0)
    elif ledvalue == 6:
        charlieplex(-1,-1,0,1)
    elif ledvalue == 7:
        charlieplex(-1,1,-1,0)
    elif ledvalue == 8:
        charlieplex(-1,0,-1,1)
    elif ledvalue == 9:
        charlieplex(1,-1,0,-1)
    elif ledvalue == 10:
        charlieplex(0,-1,1,-1)
    elif ledvalue == 11:
        charlieplex(1,-1,-1,0)
    elif ledvalue == 12:
        charlieplex(0,-1,-1,1)
        
def motorcontrol(degree):
    #GPIO pin 4, PWM control, 50Hz
    GPIO.setup(4, GPIO.OUT)
    p = GPIO.PWM(4, 50)
    p.start(0.0)
    dutycycle = 2.5 + 9.5/180 * (degree + 90)
    p.ChangeDutyCycle(dutycycle)
    time.sleep(0.5)
    p.ChangeDutyCycle(0.0)
    
def oledcontrol(text):
    #display a text on OLED
    monitor = ssd1306_oled()
    monitor.drawMessage(text)
    time.sleep(5)
    
def leave(password, start):
    #asks user to enter password when leaving the parking lot
    #measures the total time parked, and calculates fee (100yen per second for test)
    leavepass = int(maskpass.askpass(prompt = "Please input your password:\n", mask = "*"))
    if leavepass == password:
        end = time.time()
        interval = end - start
        fee = int(interval*100)
        print(interval)
        print(f"The fee is {fee} yen")
        motorcontrol(90)
        oledcontrol("fee: " + str(fee))
        time.sleep(3)
        motorcontrol(0)
    #recursion for when password is wrong
    else:
        leave()
        
def main():
    #password hidden with asterisk and userdata is obtained with user password through API
    password = int(maskpass.askpass(prompt = "Please input your password:\n", mask = "*"))
    userdata = getDataByPassword(password)
    
    #conditional statments just in case password is invalid
    if userdata == 0:
        print("Invalid password. Please try again.")
        main()
    else:
        start = time.time()
        username = userdata['user']
        userid = userdata['id']
        print(f"{username}, your parking slot is {userid}")
        
        #lighting LED of parking slot for the user
        lightup(int(userid))
        
        #opening gate
        motorcontrol(90)
        #display parking slot on oled display
        oledcontrol("slot: " + str(userid))
        time.sleep(3)
        #close gate
        motorcontrol(0)
        
    leave(password, start)
    time.sleep(3)
    main()
    
main()



        
    
        
