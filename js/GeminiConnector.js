

    function GeminiConnector(url, name){
      this.url = url;
      this.wsObject = {};
    }
    GeminiConnector.prototype = Object.create(GeminiConnector.prototype);
    GeminiConnector.prototype.open = function(evt){
      console.log(' opened!');
    }
    GeminiConnector.prototype.close = function(evt){
      console.log( ' close!');
    }
    GeminiConnector.prototype.error = function(evt){
      console.log( ' error!!');
      console.log(evt);
    }
    GeminiConnector.prototype.message = function(evt){
      let data = JSON.parse(evt.data);
      typeHandler(data.events);
    }
    GeminiConnector.prototype.initiate = function(){
      this.wsObject = new WebSocket(this.url);
      this.wsObject.onopen = this.open;
      this.wsObject.onclose = this.close;
      this.wsObject.onerror = this.error;
      this.wsObject.onmessage = this.message;
    }
    function typeHandler(eventArray){
      for(let i=0; i<eventArray.length; i++){
        let thisEvent = eventArray[i];
        updateTable(thisEvent);
      }
    }
    function updateTable(evt){
      for(let key in evt){
        let value = evt[key];
        let rightnow = new Date().toLocaleString();
        $('#'+evt.reason+'_'+key).html(value);
        $('#'+evt.reason+'_time').html(rightnow);
      }
    }
