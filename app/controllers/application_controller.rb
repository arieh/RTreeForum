class ApplicationController < ActionController::Base
  before_filter :authenticate_user!, :except => [:index]
  protect_from_forgery
end
