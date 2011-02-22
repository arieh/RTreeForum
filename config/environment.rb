# Load the rails application
require File.expand_path('../application', __FILE__)
=begin 
config.action_mailer.delivery_method = :smtp 
ActionMailer::Base.smtp_settings = {
  :address  => "mail.arieh.co.il",
  :port  => 25,
  :user_name  => "feds.arieh.co.il",
  :password  => "rjntqvzz",
  :authentication  => :login
}    

config.action_mailer.raise_delivery_errors = true
=end

config.action_mailer.delivery_method   = :postmark
config.action_mailer.postmark_settings = { :api_key => "f81e2dd5-3b70-4472-ba4c-cf261efec233" }

# Initialize the rails application
FEDs::Application.initialize!
