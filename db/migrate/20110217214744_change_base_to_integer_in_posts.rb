class ChangeBaseToIntegerInPosts < ActiveRecord::Migration
  def self.up
    change_column :posts, :base, :integer, :default=>0
  end

  def self.down
  end
end
