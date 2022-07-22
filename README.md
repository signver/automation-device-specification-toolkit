

# Blubberfish

A TCP server implementing the ADS protocol as designed by [Beckhoff](https://www.beckhoff.com). 

Hopefully this helps you as a system integrator trying to build your own web-based UI.

The main idea is to integrate the NodeJS application with this library, a HTTP server (e.g. Express), and your web UI (e.g. some React app). Let the application act as the hub where the PLC will store and send data via ADS, while the web UI can similarly share access to said data via HTTP. 

## TODO

Implement the ADS client (this doesn't affect the server capabilities). 

# Usage guide

`npm i @signver/ads-toolkit`

This will not work if the NodeJS is running on the local machine. If it needs to be hosted on the local machine, one way might be to spin up a VM to host the NodeJS application. 

After creating and starting your NodeJS application, you will need to add the appropriate ADS route to the PLC routing table as specified in their manual. 

Once done, you will simple need to handle the ADS packet accordingly in NodeJS.

# Disclaimer

This library is not yet tested, although the basic idea and functionality should more or less be working. 

This library is created based on resources and data made available via their [infosys](https://infosys.beckhoff.com/index_en.htm) site.
