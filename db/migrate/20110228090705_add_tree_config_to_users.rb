class AddTreeConfigToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :show_tree, :boolean, :default => true
  end

  def self.down
    remove_column :users, :show_tree
  end
end
