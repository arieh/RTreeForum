include ActionView::Helpers::SanitizeHelper

class PostsController < ApplicationController
  before_filter :get_parent, :only =>[:new,:create]
  
  def index
      @per_page = 8
      @start = Integer(params[:start])
      @count = Post.where(:base=>0).count
      @pages = @count/@per_page

      if (@pages*@per_page < @count) 
         @pages+=1
      end

      @Posts = Post.order('updated_at DESC').limit(@per_page).offset(@start*@per_page).where(:base=>0)

   
  end 
  def show

    @Post = Post.find(params[:id])
    if (@Post.base == 0) 
      @Posts = [@Post]
    else
      @Posts = [@Post.base_post]
    end
    puts(@Posts)
    @current = @Post.id

  end
  
  def search
    @param = params[:search]
    @Posts = Post.search(:title_or_body_contains=>@param)

    puts(@Posts)
  end


  def new
    @Post = current_user.posts.new(params[:post])
    if (@parent)
      @Post.parent_id = @parent.id
      @Post.base = @parent.base
    end
  end
  
  def edit
    @Post = Post.find(params[:id])
  end
  
  def create  
    @Post = current_user.posts.new(params[:post])
    @Post.body =sanitize @Post.body, :tags=> %w(p strong ul ol li strike a object embbed param iframe) , :attributes => %{dir}
    if (@parent)
      if (@parent.base == 0) 
        @Post.base = @parent.id
      else
        @Post.base = @parent.base
      end
      @Post.parent_id = params[:parent_id]
      @Post.base_post.updated_at = Time.new
      @Post.base_post.save

    end
   
    respond_to do |format|
      if @Post.save
        format.html { redirect_to :root, :notice =>  t('post.index.create_success') }
        format.js
      else
        format.html { render :action => "new",:alert=>"error" }
      end
    end
  end

  def update
    @Post = Post.find(params[:id])
  
    respond_to do |format|
    if @Post.update_attributes(params[:Post])
      flash[:notice] = 'Post was successfully updated.'
      format.html { redirect_to(@Post) }
      format.xml  { head :ok }
    else
      format.html { render :action => "edit" }
      format.xml  { render :xml => @Post.errors, :status => :unprocessable_entity }
    end 
    end
  end
  
  def destroy
    @Post = Post.find(params[:id])
    @Post.destroy
  
    respond_to do |format|
    format.html { redirect_to(admin_Post_url) }
    format.xml  { head :ok }
    end
  end

  protected
    def get_parent
      @parent = false;
      if (params[:parent_id])
        @parent = Post.find(params[:parent_id])
      end
    end
end
