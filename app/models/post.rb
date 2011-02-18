class Post < ActiveRecord::Base
  has_many :posts, :class_name => "Post",
    :foreign_key => "base"
  belongs_to :parent, :class_name => "Post"
  belongs_to :user

  validates_presence_of :title, :user_id, :except => [:show,:list]
end
