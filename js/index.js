// index.js
/*
TO-DO:
  - Initialize
  - Update function
  -
*/

var bloclock = {
  settings:{
        mode: '24h'
  },
  el:{
     blocksContainer: document.getElementById('blocksContainer')
  },
  Initialize: function(){

    this.drawBlocks();
    var block;

  },
  drawBlocks: function(){
    // Depending on 24h or 16.6h mode, draw the right amount of 10 minute blocks.
    if (mode=='24h') {
        amountOfBlocks = 144;
    } else {
        amountOfBlocks = 100;
    }

    // Add the blocks one by one, with the right ID and class.
    for (var blockNumber = 1; blockNumber < amountOfBlocks+1; blockNumber++) {
        block = document.createElement("div");
        block.id = 'block-' + blockNumber;
        block.className = 'block';
        this.el.blocksContainer.appendChild(block);
    }
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
