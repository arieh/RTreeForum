class Post < ActiveRecord::Base
  has_many :posts , :class_name => 'Post', :forgein_key => 'parent_id'
  belongs_to :parent, :class_name => 'Post'
  belongs_to :user
end
