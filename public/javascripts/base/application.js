;(function(){
var styles = {
  display : ['none','block']
  , visibility : ['hidden','visible']
}

Element.implement({
  'toggle' : function(style){
    if (!style || !styles.contains[style]) style='display';

    var state = this.retrieve('toggle:state') || this.getStyle(style);
    state = (state == styles[style][0]) ? styles[style][1] : styles[style][0];
    this.setStyle(style,state).store('toggle:state',state);
  }  
});  

})();



