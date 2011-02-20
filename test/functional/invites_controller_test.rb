require 'test_helper'

class InvitesControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get validate" do
    get :validate
    assert_response :success
  end

end
