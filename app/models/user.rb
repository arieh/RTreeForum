class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable   ,
  devise :database_authenticatable, :invitable,:recoverable, :rememberable, :trackable, :validatable ,  :registerable 
  has_many :posts, :class_name => "Post",
    :foreign_key => "user_id" 

  has_many :my_read_posts, :class_name => 'ReadPost'
  has_many :read_posts, :through => :my_read_posts, :source=>:post

  validates_presence_of :username

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :show_tree

  def mark_post(id)
    if (self.my_read_posts.where(:post_id=>id).count > 0) 
      return
    end
    self.my_read_posts.create(:post_id=>id)
  end
  def unmark_post(id)
    msg = self.my_read_posts.where(:post_id=>id)

    if (msg.count == 0) 
      return
    end

    msg.first.destroy 
  end
end
