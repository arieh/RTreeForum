class CreateReadPosts < ActiveRecord::Migration
  def self.up
    create_table :read_posts do |t|
      t.integer :user_id
      t.integer :post_id

      t.timestamps
    end
  end

  def self.down
    drop_table :read_posts
  end
end
