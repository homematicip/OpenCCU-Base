/**
 * hmscriptexecutor.js
 **/
 
/**
 * @fileOverview HM Script Executor
 * @author F. Werner (eQ-3)
 **/
 
/**
 * @class HMScriptExecturor
 * Dialog zum Testen von HomeMatic Script.
 **/
HMScriptExecutor = Class.create({

  initialize: function()
  {
    var screenWidth  = WebUI.getWidth();
    var screenHeight = WebUI.getHeight();
    var frameWidth   = HMScriptExecutor.CONTENT_WIDTH;
    var frameHeight  = HMScriptExecutor.CONTENT_HEIGHT;
    var frameX       = parseInt((screenWidth  - frameWidth)  / 2);
    var frameY       = parseInt((screenHeight - frameHeight) / 2);

    HMScriptExecutor.TITLE = translateKey("dialogScriptExecuterTitle");
    HMScriptExecutor.TEXT_RUN = translateKey("dialogScriptExecuterBtnExecute");
    HMScriptExecutor.TEXT_CLOSE = translateKey("dialogScriptExecuterBtnClose");
    
    this.m_layer = document.createElement("div");
    this.m_layer.className = "DialogLayer";
    
    this.m_input = new UI.Textarea()
        .setPosition(5,25)
        .setWidth(590)
        .setHeight(200)
        .setText('WriteLine("'+ translateKey("dialogScriptExecuterHelloWorld") +'");');
    
    this.m_output = new UI.Textarea()
        .setPosition(5,250)
        .setWidth(590)
        .setHeight(200); 
    
    this.m_frame = new UI.Frame(true)
      .setTitle(HMScriptExecutor.TITLE)
      .setContentSize(frameWidth, frameHeight)
      .setPosition(frameX, frameY)
      .add(new UI.Text()
        .setPosition(5,5)
        .setText(translateKey("dialogScriptExecuterLblInput"))
      )
      .add(this.m_input)
      .add(new UI.Text()
        .setPosition(5,230)
        .setText(translateKey("dialogScriptExecuterLblOutput"))
      )
      .add(this.m_output)
      .add(new UI.Button()
        .setPosition(5,455)
        .setText(HMScriptExecutor.TEXT_RUN)
        .setAction(this.run, this)
      )
      .add(new UI.Button()
        .setPosition(445, 455)
        .setText(HMScriptExecutor.TEXT_CLOSE)
        .setAction(this.close, this)
      );
      
      this.m_layer.appendChild(this.m_frame.getElement());
      Layer.add(this.m_layer);
  },

  run: function()
  {
    var _this_ = this;
    this.m_output.setText("");
       
    homematic("ReGa.runScript", {script: this.m_input.getText()}, function(response, error)
    {
      if (error === null)
      {
        _this_.m_output.setText(response);
      }
      else
      {
        _this_.m_output.setText("Fehler: " + Object.toJSON(error));
      }
    });
  },
  
  close: function()
  {
    Layer.remove(this.m_layer);
  }
  
});

HMScriptExecutor.CONTENT_WIDTH = 600;
HMScriptExecutor.CONTENT_HEIGHT = 485;

