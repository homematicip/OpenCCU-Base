/**
 * ise/sysVarsPopupLoader.js
 **/

/**
 * @fileOverview ?
 * @author ise
 **/

/**
 * @class
 **/
sysVarsPopupLoader = Class.create();

sysVarsPopupLoader.prototype = {
  /*
   * id = DOM-ID of switch
   * initState = Creation State 
   */
  
  initialize: function(path,colName,iSec)
  {
    this.currentIndex = 0;
    this.path = path;
    this.colName = colName;
    this.sec = iSec;
    this.loadPopupsysVars(this.currentIndex);
  },

  loadPopupsysVars: function()
  {      
    var t = this;
    var url = t.path+"?sid="+SessionId;
    var pb = '';
    pb += 'integer iCurrentIndex = '+this.currentIndex+';';
    var opts =
    {
      postBody: ReGa.encode(pb),
      onComplete: function(transParams)
      {
        transParams.responseText.evalScripts();
        var resp = iseStripAll(transParams.responseText.stripScripts());
        if( resp == "true" )
        {
          t.currentIndex+=5;
          t.loadPopupsysVars(t.currentIndex);
        }
        else
        {          
          t.updateTable();
        }
      }
    };
    new Ajax.Updater("dummy",url,opts);
  },
 
  updateTable: function()
  {
    var tableBody = $("sysVarDisplay");
    if( tableBody )
    {
      var count = tableBody.rows.length-1;
      for(var x=count; x > -1; x--)
      {
        tableBody.deleteRow(x);
      }

      IseSort(arSysVars,this.colName,false,true);
      for (var i = 0; i < arSysVars.length; i++) 
      {
        var tr = Builder.node('tr', {id: arSysVars[i]['trid']});
        var td = Builder.node('td', {className: 'SysVarsTblPopup'}, strCut(translateString(arSysVars[i]['name']), true));
        tr.appendChild(td);
        td = Builder.node('td', {className: 'SysVarsTblPopup'}, translateString(arSysVars[i]['desc']));
        tr.appendChild(td);
        td = Builder.node('td', {className: 'SysVarsTblPopup'}, translateString(arSysVars[i]['typenames']));
        tr.appendChild(td);
        td = Builder.node('td', {className: 'SysVarsTblPopup'}, translateString(arSysVars[i]['values']));
        tr.appendChild(td);
        td = Builder.node('td', {className: 'SysVarsTblPopup'}, translateString(arSysVars[i]['unit']));
        tr.appendChild(td);
        
        var sOnclick = "PopupClose();";
        if( this.sec ) sOnclick = "restorePrevious();";
        sOnclick = "saveDlgResult("+arSysVars[i]['id']+");"+sOnclick;
      
        td = Builder.node('td', {className: 'WhiteBkg'}, [
          Builder.node('div', {className: 'StdButton', onclick:sOnclick}, translateKey('btnSelect'))
         ]);
        tr.appendChild(td);

        tableBody.appendChild(tr);       
      }
      Cursor.set(Cursor.NORMAL);   
   }
    
    
  }
};
