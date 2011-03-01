var posts = {} , filters = filters || {};

//Filters {{{

//Base {{{
filters.Base = function(el){
  var base = new BPost(el);
  posts[el.get('id').substr(4)] = base;
  el.store('post',base);
};//}}}


// Post {{{
;(function(){
var mark = new Request({
  url : '/posts/mark'
  , method : 'post'
});
 

filters.Post = function(el){
  var id = el.get('id').substr(4), post = posts[id] = new Post(el);
  el.store('post',post);

  post.addEvent('open',function(){
     if (false == el.hasClass('read')) mark.send({data:{post_id:id}});
     el.addClass('read');
  });
};

})();
//}}}


//PostList {{{
filters.PostList = function(el){
  function handleClick(e){
      var target = $(e.target), form = target.getNext('form'), text = form.getElement('textarea'), id=el.getData('post-id');
      
      form.toggle();

      CKEDITOR.replace(text,{
         height:100
      });                       
      
      form.addEvent('ajax:before',function(e){
        var html = CKEDITOR.instances[text.id].getData();
        text.set('html',html);
      });                           
  }  
  

  el.delegateEvent('click',{
    '.reply span.reply' : handleClick
  });
}//}}}

//Tree {{{
filters.Tree = function(el){
  el.addClass('tree');
  var parent =  el.getData('parent');
  if (parent) posts[parent].addChild(el);
}

//Current {{{
filters.Current = function(el){
  var pos = el.getPosition();
  window.scrollTo(pos.x,pos.y);
}
//}}}
