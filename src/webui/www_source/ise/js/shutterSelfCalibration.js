/**
 * ise/shutterSelfCalibration.js
 **/


/**
 * @class
 **/


shutterSelfCalibration = Class.create({
  initialize: function () {
    var title = "Self Calibration",
      html ="Self Calibration";

    var dlg = new YesNoDialog(title, html, "", "html");
    dlg.btnTextNo(translateKey("btnCancel"));
    dlg.btnTextYes(translateKey("btnOk"));
  }
});

