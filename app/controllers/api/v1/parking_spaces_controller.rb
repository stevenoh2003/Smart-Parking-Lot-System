class Api::V1::ParkingSpacesController < ApplicationController
  before_action :set_parking_space, only: %i[ show update destroy ]

  # GET /parking_spaces
  def index
    @parking_spaces = ParkingSpace.all

    render json: @parking_spaces
  end

  # GET /parking_spaces/1
  def show
    render json: @parking_space
  end

  # POST /parking_spaces
  def create
    @parking_space = ParkingSpace.new(parking_space_params)

    if @parking_space.save
      render json: @parking_space, status: :created, location: @parking_space
    else
      render json: @parking_space.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /parking_spaces/1
  def update
    if @parking_space.update(parking_space_params)
      render json: @parking_space
    else
      render json: @parking_space.errors, status: :unprocessable_entity
    end
  end

  # DELETE /parking_spaces/1
  def destroy
    @parking_space.destroy
  end

  def find_by_password
    password = params[:password]
    @parking_space = ParkingSpace.find_by(password: password)

    if @parking_space
      render json: { user: @parking_space.user }
    else
      render json: { error: "Parking space not found for the given password" }, status: :not_found
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_parking_space
      @parking_space = ParkingSpace.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def parking_space_params
      params.require(:parking_space).permit(:user, :index, :hasShade, :isBigCa, :password)
    end

    def find_id
      user = params[:user]
      @parking_space = ParkingSpace.find_by(user: user)

      if @parking_space
        render json: { id: @parking_space.id }
      else
        render json: { error: "Parking space not found for user #{user}" }, status: :not_found
    end
  end

end
