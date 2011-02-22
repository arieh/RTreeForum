class IndexController < ApplicationController
  def index
      @per_page = 8
      @start = Integer(params[:start])
      @count = Post.where(:base=>0).count
      @pages = @count/@per_page

      if (@pages*@per_page < @count) 
         @pages+=1
      end

      @Posts = Post.order('updated_at DESC').limit(@per_page).offset(@start*@per_page).where(:base=>0)

      @new_post = Post.new
   
  end 
end
