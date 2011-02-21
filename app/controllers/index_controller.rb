class IndexController < ApplicationController
  def index
    if (current_user)
      @Posts = Post.order('updated_at DESC').limit(10).where(:base=>0)
      @new_post = Post.new
    else
      flash[:notice] = t('index.not_logged_in')
    end
  end 
end