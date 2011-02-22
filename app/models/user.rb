class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable   ,
  devise :database_authenticatable, :invitable,:recoverable, :rememberable, :trackable, :validatable ,  :registerable 
  has_many :posts

  validates_presence_of :username

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username
end
