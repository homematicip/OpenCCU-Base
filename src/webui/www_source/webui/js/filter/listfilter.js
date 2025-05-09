/**
 * listfilter.js
 **/

/**
 * Konstruktor. ListFilter
 **/
ListFilter = Class.create({
  
  /**
   * Konstruktor
   **/
  initialize: function(name, list, callback)
  {
    this.name     = name;
    this.list     = list.clone();
    this.callback = callback;
    this.id       = name.replace(/\./g, "_");
    this.formId   = this.id + "Form";
    this.reset();
  },

  /**
   * Prüft, ob der Filter aktiv ist
   **/
  isSet: function()
  {
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (true === this.list[i]._selected) { return true; }
    }
    return false;
  },
  
  /**
   * Wählt ein Listenelement aus
   **/
  select: function(id, selected)
  {
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (id == this.list[i].id) 
      {
        this.list[i]._selected = selected;
        break;
      }
    }
  },
  
  /**
   * Prüft, ob ein Listenelement ausgewählt ist
   **/
  isSelected: function(id)
  {
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (id == this.list[i].id) { return this.list._selected; }
    }
    return false;
  },
    
  /**
   * Liefert den HTML-Code des Filters
   **/
  getHTML: function()
  {
    return ListFilter.TEMPLATE.process({
      list  : this.list,
      isSet : this.isSet(),
      name  : this.name,
      id    : this.id,
      formId: this.formId
    });
  },
   
  matchString: function(str)
  {
    if (false === this.isSet()) { return true; }
    
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (true === this.list[i]._selected) 
      {
        if (this.list[i].name == str) { return true; }
      } 
    }
    return false;
  },
  
  matchStringArray: function(list)
  {
    if (false === this.isSet()) { return true; }
    
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (true === this.list[i]._selected) 
      {
        var name = this.list[i].name;
        if (0 <= list.indexOf(name)) { return true; }
      } 
    }
    return false;
  },
  
  matchArray: function(list)
  {
    if (false === this.isSet()) { return true; }
    
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      if (true === this.list[i]._selected) 
      {
        var id = this.list[i].id;
        for (var j = 0; j < list.length; j++)
        {
          if (list[j].id == id) { return true; }
        }
      } 
    }
    return false;
  },
  
  /**
   * Schließt den Filter und ruft die Callback-Funktion auf
   **/
  set: function()
  {
    if ($(this.formId))
    {
      var values = $(this.formId).values;

      for (var i = 0, len = values.length; i < len; i++)
      {
        this.select(values[i].value, values[i].checked);
      }

      if ($(this.id))    {
        $(this.id).hide();
        try {jQuery("#"+ this.id).draggable("destroy");} catch (e) {}
      }
      if (this.callback) { this.callback(); }
    }
  },
  
  /**
   * Schließt den Filter ohne Änderungen zu übernhemen
   **/
  close: function()
  {
    if ($(this.formId))
    {
      var values = $(this.formId).values;
      
      for (var i = 0, len = values.length; i < len; i++)
      {
        values[i].checked = this.isSelected(values[i].value);
      }
    }
    
    if ($(this.id))    {
      $(this.id).hide();
      //try {jQuery("#"+ this.id).draggable("destroy");} catch (e) {}
    }
    //try {if (this.callback) { this.callback(); } } catch (e) {};
  },
  
  /**
   * Setzt den Filter zurück
   **/
  reset: function()
  {
    for (var i = 0, len = this.list.length; i < len; i++)
    {
      this.list[i]._selected = false;
    }
    
    this.close();
  }
  
});

ListFilter.TEMPLATE = TrimPath.parseTemplate(LISTFILTER_JST);
