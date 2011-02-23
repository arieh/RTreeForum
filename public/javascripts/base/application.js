//Basic functionality {{{
;(function($){
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

var has = (function(){
    var input = document.createElement('input');
    input.setAttribute('type','text');
    return ('placeholder' in input);        
})();

if (!has){
    $$('input[placeholder]').each(function(input){
        var pl = input.get('placeholder')
        input.set('value',pl);
        input.addEvents({
             focus : function(e){
                if (input.value == pl) input.value =''; 
             }
             , blur : function(e){
                if (input.value=='') input.value = pl;
             }
        });
    });     
}
 
}).apply(this,[document.id]);
//}}}

//Filters {{{

var filters = filters || {};

filters.NewPost = function(el){
  function click(e){
     e.preventDefault();
     var box = new FloatBox(form,{size:{x:380,y:345}});
     //form.getElement('input[type=submit]').dispose();
     if (!CKEDITOR.instances[text.id]) CKEDITOR.replace(text,{
        height : 120
     });
     form.addEvent('submit',function(e){
        text.set('html',CKEDITOR.instances[text.id].getData());
     });
  }

  var form = $('new-post').dispose().setStyles({
       'visibility' : 'visible'
       ,'position'  : 'relative'
     })           
    , text = el.getElement('textarea');
  
  el.addEvent('click',click);
}
//}}}

// CKEditor config {{{
CKEDITOR.config.contentsCss = '/stylesheets/editor.css';
CKEDITOR.config.contentsLangDirection='ltr';
CKEDITOR.config.toolbar = [
  ['Source','-','Cut','Paste','PasteFromWord','-','Bold','Strike','Indent','BidiLtr','BidiRtl','-','Link','Unlink','-'] 
  , ['NumberedList','BulletedList']
];
CKEDITOR.config.entities = false;  
//}}}
var bhvr = new Behavior();
bhvr.addFilters(filters);
bhvr.apply(document);
