# Load the rails application
require File.expand_path('../application', __FILE__)
 
config.action_mailer.delivery_method = :smtp 
ActionMailer::Base.smtp_settings = {
  :address  => "mail.arieh.co.il",
  :port  => 25,
  :user_name  => "feds.arieh.co.il",
  :password  => "rjntqvzz",
  :authentication  => :login
}    

config.action_mailer.raise_delivery_errors = true
# Initialize the rails application
FEDs::Application.initialize!
