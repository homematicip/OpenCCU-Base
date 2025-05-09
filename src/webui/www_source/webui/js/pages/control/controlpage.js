ControlPage = new function()
{
  var MAINMENU_ID = "MAINMENU_CONTROL";
  
  this.enter = function(options)
  {
    MainMenu.select(MAINMENU_ID);
    loadStatus(options);
  };
  
  this.leave = function()
  {
  };

  this.resize = function()
  {
  };
  
}();
