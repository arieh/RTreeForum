class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.string :title
      t.integer :user_id
      t.text :body
      t.integer :parent_id
      t.integer :base, :default=>0

      t.timestamps
    end
  end

  def self.down
    drop_table :posts
  end
end
