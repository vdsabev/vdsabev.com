/** @jsx h */
import { app, h } from 'hyperapp';

// TODO: Make availability and date range dynamic
const availableStyle = { color: '#27ae60' };
const availableStatus = 'available';
const availableRange = 'Q4 2017 / Q1 2018';

const email = 'vdsabev@gmail.com';

export const Contact = () =>
  <section id="contact" class="contact narrow">
    <h1 class="contact-title">Contact</h1>

    <form name="form" onsubmit="return false">
      <fieldset id="contact-fieldset">
        <p>I'm currently <b style={availableStyle}>{availableStatus}</b> for projects and consulting for <b>{availableRange}</b>.</p>

        <label>
          So, how can I help?
          <textarea
            id="contact-text"
            name="text"
            placeholder="Feel free to introduce yourself, describe your business idea, and how you think I could fit in the project"
            required
          ></textarea>
        </label>

        <br />

        <label>
          And how can I reach you?
          <input id="contact-email" type="email" name="email" placeholder="Email" required />
        </label>

        <br />

        <button class="contact-submit" type="submit" onclick="submitContactForm()">SEND</button>
      </fieldset>
    </form>

    <div id="contact-success">Thanks for reaching out 😊 I'll get back to you soon!</div>

    <div id="contact-error">
      Oops! Something went wrong 😐 The error has been logged - I'll see what I can do about it.
      {/* TODO: Send contact-text value as mailto text: http://www.angelfire.com/dc/html-webmaster/mailto.htm */}
      And don't worry - you can still reach me at <a target="_blank" href={`mailto:${email}`}>{email}</a>
    </div>
  </section>
;

var contactFormSending; // TODO: Set cursor to progress
var contactFormSent;
window.submitContactForm = function () {
  if (contactFormSending || contactFormSent) return;

  var email = getValue('contact-email');
  var text = getValue('contact-text');

  if (!email) return console.error('Invalid email:', JSON.stringify(email));
  if (!text) return console.error('Invalid text:', JSON.stringify(text));

  var message = {
    subject: 'VDSABEV.COM: New message from ' + email,
    text: text
  };

  contactFormSending = true;
  setClass('contact-success', 'shown', false);
  setClass('contact-error', 'shown', false);
  setDisabled('contact-fieldset', true);

  // https://stackoverflow.com/questions/14873443/sending-an-http-post-using-javascript-triggered-event
  var request = new XMLHttpRequest();

  request.addEventListener('load', function () {
    contactFormSending = false;
    contactFormSent = true;
    logEvent('contact.success', { message: message });
    setClass('contact-success', 'shown', true);
  });

  request.addEventListener('error', function () {
    contactFormSending = false;
    console.error(request);
    logEvent('contact.error', { message: message });
    setClass('contact-error', 'shown', true);
    setDisabled('contact-fieldset', false);
  });

  // TODO: Move URL to configuration
  request.open('POST', 'https://us-central1-vladimir-sabev.cloudfunctions.net/sendEmail', true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify(message));
};

function setText(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

function getValue(elementId, text) {
  return document.getElementById(elementId).value;
}

function setDisabled(elementId, disabled) {
  document.getElementById(elementId).disabled = disabled;
}

function setClass(elementId, className, status) {
  var classList = document.getElementById(elementId).classList;
  status ? classList.add(className) : classList.remove(className);
}

function logEvent(type, data) {
  window.ga && ga('send', 'event', type, data);
}
