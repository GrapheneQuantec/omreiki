/******* Do not edit this file *******
Simple Custom CSS and JS - by Silkypress.com
Saved: Feb 27 2018 | 16:31:00 */
/* Default comment here */ 

var affirmationTimer;

var letterCounter, elementCounter, affirmationCount, delayCounter, affCtr;
var fullText;
var elements = [];
var afficmationNames = [];
var callback; 
    
var affirmationsNumber = 16;
var intervalDuration = 60;

var pauseFlag;

function startAffirmation(affirmationName, affNumber, callbackpar, intervalDur, names) {
  
  affirmationsNumber = (affNumber) ? affNumber : affirmationsNumber;
  intervalDuration = (intervalDur) ? intervalDur : intervalDuration;
  callback = (callbackpar) ? callbackpar : callback;
  
  console.log('callback', callback);
  
  if (affirmationTimer) 
  {
    clearTimer();
    pauseFlag = true;
  } 
  else
  {
    if(pauseFlag) {
      startTimer();
      pauseFlag = false;
    }
    else Speak(affirmationName, names);
  }
}

function Speak(affs, names) {
  
  afficmationNames = names;
  jQuery.each( affs, function( index, value ){
    affName = value;
  
    var element = jQuery(affName);
    element.each(function(){
      var origText = jQuery(this).html();
      origText = origText.replace(/<br\s*[\/]?>/gi, "");
      jQuery(this).html(origText).attr('origText', origText);
      if(!jQuery(this).attr('no-wrap')) jQuery(this).css('white-space', 'pre-wrap');
    });
  
    elements[index] = element;
  
  });
  
  letterCounter = 0;
  elementCounter = 0;
  affirmationCount = 0;
  affCtr = 0;
  if(!fullText){
    setElement();
  }

  selectAffirmationForKaraoke();
  startTimer();
  updateStar(affirmationCount);
}

function selectAffirmationForKaraoke() {
  if(afficmationNames && afficmationNames[affCtr]){
    selectAffirmation(jQuery('[affirmation="'+afficmationNames[affCtr]+'"]'));
  } 
}

function startTimer(){
  affirmationTimer = setInterval(onTick, intervalDuration);
}

function clearTimer(){
  clearInterval(affirmationTimer);
  affirmationTimer = null;
}

function updateStar(index) {
  index++;
  index = (index > 16) ? 0 : index;
  var affirmationBg = jQuery('.affirmation').css('background-image');
  var starUrl = "../images/starpoints/active_star_" + index + ".png";
  jQuery('.affirmation').css('background-image', 'url("' + starUrl + '"), ' + affirmationBg);
}


function setElement() {
  textContainer = elements[affCtr].eq(elementCounter);
  delayCounter = (textContainer.attr('delay')) ? parseInt(textContainer.attr('delay')) : 0;
  fullText = textContainer.attr('origText');
}

function colorPassedText() {

  var text = fullText.substring(0, letterCounter);
  var textLeft = fullText.substring(letterCounter, fullText.length);

  var injectSpans = jQuery('<span class="passedAffirmationText"></span>').text(text);

  textContainer.html('');
  textContainer.append(injectSpans);
  textContainer.append(textLeft);


}



function onTick() {

  if(delayCounter === 0) {
    letterCounter++;
    delayCounter = (textContainer.attr('delay')) ? parseInt(textContainer.attr('delay')) : 0;
  }
  else {
    delayCounter--;
  }


  // if reached end of text reset letter count and move to another text
  if (letterCounter > fullText.length) {
    letterCounter = 0;        

    elementCounter++;

    if (elementCounter >= elements[affCtr].length) {

      elementCounter = 0;
      affirmationCount++;
      setElement();
      
      elements[affCtr].each(function(){
        jQuery(this).html(jQuery(this).attr('origText'));
      });
      
      affCtr++;
      affCtr = affCtr != elements.length ? affCtr : 0;
      selectAffirmationForKaraoke();
      
      if(afficmationNames){
        updateStar(affirmationCount);
      }
      console.log('callgirl', callback);
      if( affirmationCount >= affirmationsNumber ) {
        console.log('niby kasuje', callback);
        clearTimer();
        fullText = false;
        if (callback) {
          callback();
          callback = null;
        }
      }
    }
    else  {
      setElement();
    }
  } 
  else  {
    colorPassedText();
  }
}