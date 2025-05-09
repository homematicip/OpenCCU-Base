/**
 * rega.js
 * Zugriff auf den ise ReGa Webserver.
 **/
 
/**
 * @fileOverview ?
 * @author Falk Werner (eQ-3)
 **/

/**
 * @class
 **/ 
ReGa = {

  /**
   * 1) ReGa arbeitet mit Latin-1 Zeichencodierung (ISO-8859-1)
   * 2) Anfragen über das XMLHttpRequest-Objekt sind i.d.R. UTF-8-codiert
   *
   * ==> Codierung der Anfrage:
   *     - escape() wandelt UTF-8 nach ASCII um 
   *       (Latin-1 Sonderzeichen werden durch Escape-Sequenzen ersetzt)
   *     - Anfrage wird in <prototypejs><![CDATA[ ... ]]><prototypejs>
   *       verpackt
   *
   * ==> Decodierung erfolgt durch den ReGa Webserver
   **/
  encode: function(data) 
  {
    return "<prototypejs><![CDATA[" + escape(data) + "]]></prototypejs>";
  }
};
