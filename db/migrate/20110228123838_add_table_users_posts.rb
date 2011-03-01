class AddTableUsersPosts < ActiveRecord::Migration
  def self.up
    create_table :users_posts do |t|
      t.reference :user
      t.reference :post
      t.timestamps
    end
  end

  def self.down
    drop_table :UsersPosts
  end
end
