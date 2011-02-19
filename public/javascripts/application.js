var posts = {};
$$('.post').each(function(el){
  var id = el.id.substr(4);
  posts[id] = new Post(el);
  el.store('Post',posts[id]);
});                      
Object.each(posts,function(post){  
  var parent = $(post).get('data-parent');
  if (parent && posts[parent]) posts[parent].addChild(post);
});
