class AddUserToInvites < ActiveRecord::Migration
  def self.up
    add_column :invites, :users_id, :integer
  end

  def self.down
    remove_column :invites, :users_id
  end
end
