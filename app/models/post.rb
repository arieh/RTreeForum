class Post < ActiveRecord::Base
  has_many :posts, :class_name => "Post",
    :foreign_key => "base"
  belongs_to :base, :class_name => "Post"
  
  has_one :parent, :class_name =>"Post", :foreign_key =>"parent_id"

  belongs_to :user
  
  validates_presence_of :title, :user_id, :except => [:show,:list]
end
