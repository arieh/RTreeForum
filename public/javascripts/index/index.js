var posts = {}
  , new_post = $('new-post').dispose().setStyles({
    'visibility':'visible'
    , 'position' : 'relative'
  })
  , text = new_post.getElement('textarea');
$$('.post,.base').each(function(el){
  var id = el.id.substr(4);
  posts[id] = el.hasClass('base') ? new BPost(el) : new Post(el);
  el.store('Post',posts[id]);
});                      

CKEDITOR.config.toolbar = [
  ['Source','-','Cut','Paste','PasteFromWord','-','Bold','Strike','Indent','BidiLtr','BidiRtl','-','Link','Unlink','-'] 
  , ['NumberedList','BulletedList']
];
CKEDITOR.config.entities = false;

Object.each(posts,function(post){  
  var parent = $(post).get('data-parent');
  if (parent && posts[parent]) posts[parent].addChild(post);
});
$$('.posts')[0].delegateEvent('click',{
   '.reply span.reply' : function (e){
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
});
$('new-post-button').addEvent('click',function(e){
   e.preventDefault();
   var box = new FloatBox(new_post,{size:{x:380,y:345}});
   //new_post.getElement('input[type=submit]').dispose();
   if (!CKEDITOR.instances[text.id]) CKEDITOR.replace(text,{
      height : 120
   });
   new_post.addEvent('submit',function(e){
      text.set('html',CKEDITOR.instances[text.id].getData());
   });
});
