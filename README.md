# Helium_MakerfabsSoilMoistureSensorV3

## Equipment needed:

|Sensor|<https://www.makerfabs.com/lora-soil-moisture-sensor-v3.html>||
| :- | :- | :- |
|3.3V USB to TTL / Serial converter|<https://www.makerfabs.com/cp2104-usb-to-serial-converter.html>|Makerfabs recommended|
||<https://ftdichip.com/products/ttl-232r-3v3/>|Arduino recommended|
||<https://www.sparkfun.com/products/9873>|Arduino recommended|
||[https://www.amazon.com/Serial-Adapter-Signal-Prolific-Windows/dp/B07R8BQYW1/](https://www.amazon.com/Serial-Adapter-Signal-Prolific-Windows/dp/B07R8BQYW1/ref=rvi_sccl_3/130-8941171-3218759?pd_rd_w=pLTyv&content-id=amzn1.sym.f5690a4d-f2bb-45d9-9d1b-736fee412437&pf_rd_p=f5690a4d-f2bb-45d9-9d1b-736fee412437&pf_rd_r=2VXNT4N0YP2KE4HXH7XZ&pd_rd_wg=rzSKu&pd_rd_r=5e7c75ef-e88f-4056-a7fc-fb7d07ab074c&pd_rd_i=B07R8BQYW1&psc=1)|Not ideal, but what I had lying around|
||[https://www.amazon.com/dp/B07X4ZTRD2](https://www.amazon.com/dp/B07X4ZTRD2?psc=1&ref=ppx_yo2ov_dt_b_product_details)|did NOT work|
|Dupont wire and header pins||optional depending on converter|

## Connecting and uploading to the board:

|1. Use EITHER the power output of the USB-TTL converter OR batteries to power the sensor, not both|
| :- |
|2. If the USB-TTL converter does not have DTR, you must use the RST button on the sensor to upload a sketch: hold down RST, press upload, wait until the status shows "uploading", immediately release RST|
|3. If connection does not work, try reversing RX and TX|
|What worked for me: sensor powered by batteries; converter GND, RX, TX only connected, RX-TX reversed|

## Software needed:
<https://hackaday.io/project/180796-lorawan-soil-moisture-sensor>

## Reference info:

|Classic ATMEL AVR 8-bit Atmega328P, with Arduino Pro Mini(3.3V/8M bootloader pre-loaded) .|
| :- |
|AHT10 temperature and humidity sensor.|
|<https://docs.arduino.cc/retired/getting-started-guides/ArduinoProMini>|


