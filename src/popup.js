const api = chrome != null ? chrome : browser;

let value = 1;

async function sendMsg(msg){
  const [tab] = await api.tabs.query({active: true, lastFocusedWindow: true});
  api.tabs.sendMessage(tab.id, msg);
}

function select(newValue, propagate){
  value = newValue;
  try {
    document.getElementById("value").innerHTML = value;
    if(propagate){
      sendMsg({value});
    }
  } catch (e) {
    console.error(e);
  }
}

api.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.initRate == null){
      return;
    }
    select(request.initRate, false);
  }
);

try {
  document.getElementById("value").innerHTML = value;

  const slider = document.getElementById('slider')
  slider.addEventListener('input', (e) => select(e.target.value, true));

} catch (e) {
  console.error(e);
}

sendMsg({init: true})
