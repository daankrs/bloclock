// index.js
/*
TO-DO:
  - Initialize
  - Update function
  -
*/
var block,mode;

var bloclock = {
  settings:{
      amountOfBlocks: 100,
      bedTime:{
        hour:'23',
        minutes:'00'
      }
  },
  el:{
     blocksContainer: document.getElementById('blocksContainer')
  },
  Initialize: function(){
    this.drawBlocks();
    this.updateBlocks();
    setInterval(this.updateBlocks, 1000);

    this.el.blocksContainer.style.opacity = "1";

    new Granim({
           element: "#gradientCanvas",
           name: "basic-gradient",
           direction: "diagonal",
           opacity: [1, 1],
           isPausedWhenNotInView: !0,
           states: {
               "default-state": {
                   gradients: [["#02AAB0", "#00CDAC"], ["#9D50BB", "#6E48AA"], ["#AA076B", "#61045F"], ["#EB3349", "#F45C43"], ["#ffb347", "#ffcc33"], ["#26D0CE", "#1A2980"], ["#83a4d4", "#b6fbff"]],
                   transitionSpeed: 1e5
               }
           }
         });


  },
  drawBlocks: function(){
    // Depending on 24h or 16.6h mode, draw the right amount of 10 minute blocks.
    // Add the blocks one by one, with the right ID and class.
    bedTime = moment().hour(this.settings.bedTime.hour).minute(this.settings.bedTime.minutes).seconds("00");
    wakeTime = moment(bedTime).subtract(1000, "minutes");

    for (var blockNumber = 1; blockNumber < (this.settings.amountOfBlocks + 1); blockNumber++) {
        block = document.createElement("div");
        blockTime = moment(wakeTime).add((10*blockNumber-10), "minutes");

        block.id = 'block-' + blockNumber;
        block.className = 'block';
        block.innerHTML = moment(blockTime).format("HH:mm");

        this.el.blocksContainer.appendChild(block);
    }

  },
  updateBlocks:function(){
    blocksOver = 0;

    bedTime = moment().hour(bloclock.settings.bedTime.hour).minute(bloclock.settings.bedTime.minutes).seconds("00");
    wakeTime = moment(bedTime).subtract(1000, "minutes");

     //Loop through all the blocks to see which ones are over and which are not.
     for (var blockNumber = 1; blockNumber < (bloclock.settings.amountOfBlocks + 1); blockNumber++) {
        block = document.getElementById("block-"+blockNumber);
        blockTime = moment(wakeTime).add((10*blockNumber-10), "minutes");

        blockIsOver = moment().isAfter(moment(blockTime).add(10, "minutes"));
        blockIsOn = moment().isSameOrBefore(moment(blockTime).add(10, "minutes")) && moment().isAfter(moment(blockTime));

        if(blockIsOver)
          blocksOver++;

        if(blockIsOn && !block.classList.contains('blinking')){
          console.log(blockNumber+' is now on');
          block.classList.add('blinking');

        }else if(blockIsOver && !block.classList.contains('over')){
          block.classList.add('over');
          console.log(blockNumber + ' is now over');

          if(block.classList.contains('blinking')){
            block.classList.remove('blinking');
          }

        }else if(!blockIsOver && block.classList.contains('over')){
          block.classList.remove('over');
          console.log(blockNumber + ' is now not over anymore');
        }

     }

     document.title = "Bloclock (" +blocksOver + "/" + bloclock.settings.amountOfBlocks + ")";
  }
};

// Sidebar, open and closing functions
var sidebar = {
  el:{
    infoButton: document.getElementById("infoButton"),
    infoWindow: document.getElementById("infoWindow"),
    hoverArea: document.getElementById("hoverDetection")
  },
  Initialize:function(){
    this.el.hoverArea.addEventListener("mouseover", this.open);
    this.el.infoWindow.addEventListener("mouseout", this.close, !0);
  },
  open:function(){
    // Since open and close function are called from outside the object, use sidebar. instead of this.
    sidebar.el.infoWindow.className = "sidenav open";
    sidebar.el.infoButton.style.opacity = "0.0";
  },
  close:function(a){
    for (var b = a.toElement || a.relatedTarget; b && b.parentNode && b.parentNode != window;) {
        if (b.parentNode == this || b == this)
            return b.preventDefault && b.preventDefault(), !1;
        b = b.parentNode;
    }
    sidebar.el.infoWindow.className = "sidenav";
    sidebar.el.infoButton.style.opacity = "0.6";
  }
};

window.onload = function(){
  sidebar.Initialize();
  bloclock.Initialize();
};
