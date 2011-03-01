class ReadPost < ActiveRecord::Base
  validates_uniqueness_of :post_id, :scope => :user_id

  belongs_to :post
  belongs_to :user
end
