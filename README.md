# Tappity

User Story:

If you ever find yourself tapping your fingers to an imaginary beat? This is the chance to turn that music into reality. Using a  glove with conductive fingertips, tap on any conductive surface (such as a metal table, your arm, even a houseplant) and using a makey-makey as an interface, record that beat using a portable Raspberry Pi running an express server. Automatically upload your musical creation to the cloud,  and save it on your personal Tappity web page. Alter the sounds produced using a musical interface drawn from the MIDI / Web Audio api [and potentially share with friends and/or download a compatible MIDI file for future capabilities].

Technologies used:
* makey-makey interface: https://learn.sparkfun.com/tutorials/makey-makey-quickstart-guide
* Rasberry Pi running Debian https://www.raspberrypi.org/products/raspberry-pi-2-model-b/
* Javascript
* node
* express
* potentially midi-writer js or similar https://www.npmjs.com/package/midi-writer-js
* Web Audio API and/or MIDI API
* React
* CSS
* Postgres
* [bcrypt] - if time
* [jwt] - if time

![rough sketch of the concept](figures/diagram.jpg)

![Initial Wireframe of app, full screen](figures/wireframe.png)
