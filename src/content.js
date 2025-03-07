const api = chrome != null ? chrome : browser;

function initRate(){
  try {
    const video = document.getElementsByTagName('video')[0];
    api.runtime.sendMessage({initRate: video.playbackRate});
  } catch (e) {
    console.error(e);
  }
}

function updateRate(value){
  try {
    document.getElementsByTagName('video')[0].playbackRate = value;
  } catch (e) {
    console.error(e);
  }
}

api.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.value != null){
      updateRate(request.value);
    } else if(request.init == true){
      initRate();
    }
  }
);

initRate();

