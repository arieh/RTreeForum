var posts = {} , filters = filters || {};

//Filters {{{

//Base {{{
filters.Base = function(el){
  var base = new BPost(el);
  posts[el.get('id').substr(4)] = base;
  el.store('post',base);
};//}}}

// Post {{{
filters.Post = function(el){
  var post = posts[el.get('id').substr(4)] = new Post(el);
  el.store('post',post);
  posts[el.getData('parent')].addChild(post);
};//}}}

//PostList {{{
filters.PostList = function(el){
  function handleClick(e){
      var target = $(e.target), form = target.getNext('form'), text = form.getElement('textarea');
      form.toggle();
      CKEDITOR.replace(text,{
         height:100
      });                       
      form.addEvent('submit',function(e){
        var html = CKEDITOR.instances[text.id].getData();
        text.set('html',html);
      });                           
  }  
    
  el.delegateEvent('click',{
    '.replay span.reply' : handleClick
  });
}//}}}

//}}}
