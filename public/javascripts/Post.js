;(function($){

"use strict";

var Post = this.Post = new Class({
    Implements : [Events,Options]
    , options :{
        hideFn : function(el){}
        , showFn : function(el){}   
    }
    , post : null
    , elements : null
    , events : null
    , opened : false
    , initialize : function initialize(element,options){
        this.post = element;
        this.events = {
            open : this.open.bind(this)
            , close :this.close.bind(this)
            , toggle : this.toggle.bind(this)
        };
        
        this.generate();
        this.attach();
    }
    , generate : function generate(){
        this.elements = {
            list : this.post.getElement('.message-list') || new Element('ol',{'class':'message-list'}).inject(this.post)
            , handle : this.post.getElement('.handle')
            , body : this.post.getElement('.body')
        };  
    }
    , attach : function attach(){
        if (this.elements.handle) this.elements.handle.addEvent('click',this.events.toggle);
    }
    , open :function open(){
        this.options.showFn(this.elements.body);
        this.post.addClass('open').removeClass('close');
        this.opened = true;
        this.fireEvent('open');
    }
    , close : function close(){
        this.options.hideFn(this.elements.body);
        this.post.addClass('close').removeClass('open');
        this.opened = false;
        this.fireEvent('open');
    }
    , toggle : function toggle(){
        this[this.opened ? 'close' : 'open']();
    }
    , addChild : function addChild(element){
        this.elements.list.adopt(element);
    }
    , toElement: function toElement(){ return this.post;}
});

}).apply(this,[document.id]);
