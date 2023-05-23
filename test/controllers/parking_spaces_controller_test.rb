require "test_helper"

class ParkingSpacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @parking_space = parking_spaces(:one)
  end

  test "should get index" do
    get parking_spaces_url, as: :json
    assert_response :success
  end

  test "should create parking_space" do
    assert_difference("ParkingSpace.count") do
      post parking_spaces_url, params: { parking_space: { index: @parking_space.index, user: @parking_space.user } }, as: :json
    end

    assert_response :created
  end

  test "should show parking_space" do
    get parking_space_url(@parking_space), as: :json
    assert_response :success
  end

  test "should update parking_space" do
    patch parking_space_url(@parking_space), params: { parking_space: { index: @parking_space.index, user: @parking_space.user } }, as: :json
    assert_response :success
  end

  test "should destroy parking_space" do
    assert_difference("ParkingSpace.count", -1) do
      delete parking_space_url(@parking_space), as: :json
    end

    assert_response :no_content
  end
end
