# Tappity

User Story:

Do you ever find yourself tapping your fingers to an imaginary beat? Turn that music into reality! Using a glove with conductive fingertips, tap on any conductive surface (such as a metal table, your arm, even a houseplant) and using a makey-makey as an interface connected to a raspi server, record the beat and upload your musical creation to the cloud on the Tappity app. Alter the sounds produced utilizing the Web Audio API.

Up on Heroku: http://tappitytap.herokuapp.com/

Technologies used:
* makey-makey/arduino
* raspberry pi
* javascript
* node
* express
* web audio api
* react
* CSS
* postgreSQL
* bcrypt
* json web token

![Initial Wireframe of app, full screen](figures/wireframe.png)

Requirements:
- makey-makey, arduino or similar interface that can produce key presses on user input - in particular mapped to a, w, d, f, g is ideal for the full experience. raspberry pi or similar required for remote useage, available on separate repo.

![glove prototype](https://i.imgur.com/HbhZ2n1.jpg)


Acnowledgements:
- @gittheking and @jasonseminara for webpack config
- @rapala61 for auth reference
- http://www.codrops.com for piano audio samples
- http://www.99sounds.org for drum audio samples
- flaticon.com for icon logos

Known Issues:
- known problems with CSS rendering in React on Heroku w/ webpack
- not currently mobile friendly

Future Additions:
- fully embedded CSS to resolve some display issues and improve UX
- improved glove design with more integrated electronics
- more robust raspi server with more options for hardwired inputs
