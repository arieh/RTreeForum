var posts = {}
  , new_post = $('new-post').dispose().setStyles({
    'visibility':'visible'
    , 'position' : 'relative'
  });
$$('.post,.base').each(function(el){
  var id = el.id.substr(4);
  posts[id] = el.hasClass('base') ? new BPost(el) : new Post(el);
  el.store('Post',posts[id]);
});                      

Object.each(posts,function(post){  
  var parent = $(post).get('data-parent');
  if (parent && posts[parent]) posts[parent].addChild(post);
});
$$('.posts')[0].delegateEvent('click',{
   '.reply span' : function (e){
      var target = $(e.target);
      target.getNext('form').toggle();
   }
});
$('new-post-button').addEvent('click',function(e){
   e.preventDefault();
   var box = new FloatBox(new_post,{size:{x:300,y:300}});
});
