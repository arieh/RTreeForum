class ApplicationController < ActionController::Base
  before_filter :check_user, :except=>[:sign_in]
  protect_from_forgery

  before_filter :mailer_set_url_options
 
  def mailer_set_url_options
    ActionMailer::Base.default_url_options[:host] = request.host_with_port
  end

  def check_user                                           
    #allowed = {'devise/sessions'=>'new','devise/invitations'=>'edit'}
    allowed = ['/users/invitation','/users/sign_in','/user/invitation/accept']
    if (!current_user) 
      if (allowed.index(request.env['PATH_INFO']) != nil )
        return
      end

      redirect_to new_user_session_path, :notice => t('not_logged_in')
    end
  end
end
