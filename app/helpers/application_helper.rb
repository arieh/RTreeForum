module ApplicationHelper
  def mtitle(title)
    content_for :title do
      return title
    end
  end
end
