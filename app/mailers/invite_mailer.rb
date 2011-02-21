class InviteMailer < ActionMailer::Base
  default :from => "invite@feds.co.il"

  def new_invite(invite) 
    @Invite = invite
  end
end
