class AddInvitableToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.string   :invitation_token, :limit => 60
      t.datetime :invitation_sent_at
      t.index    :invitation_token
    end
  end

  def self.down
  end
end
