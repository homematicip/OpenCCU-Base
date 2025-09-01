iseDoorLockTransceiver = Class.create();
iseDoorLockTransceiver.prototype = {

  initialize: function(chId, opts)
  {
    var self = this,
    metaRampTime;
    console.log("iseDoorLockTransceiver", opts);
    this.id = chId;
    this.opts = opts;
    this.initElem();
  },

  initElem: function() {
    this.btnLockTargetLevel = jQuery("#"+this.id+"lockTargetLevel");

    this.btnLockTargetLevel.on("click", function() {
      console.log("Set Target Level");
    });
  }

};