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
* postgres
* bcrypt
* json web token

Requirements:
- makey-makey, arduino or similar interface that can produce key presses on user input - in particular mapped to a, w, d, f, g is ideal for the full experience. raspberry pi required for remote useage, available on separate repo.

![Initial Wireframe of app, full screen](figures/wireframe.png)

Acnowledgements:
@gittheking and @jasonseminara for webpack config
@rapala61 for auth reference
http://www.codrops.com for piano audio samples
http://www.99sounds.org for drum audio samples
Fingerprint images by Ema Dimitrova from the Noun Project
flaticon.com for icon logo

Known Issues:
- problems with CSS rendering in React on Heroku
- some UX issues
- not super mobile friendly

Future Additions:
- cleaner CSS and improved UX
- improved glove design with more integrated electronics
- more robust raspi server with more options for hardwired inputs
- get some videos of it in action!
