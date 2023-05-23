class AddIsBigCarToParkingSpaces < ActiveRecord::Migration[7.0]
  def change
    add_column :parking_spaces, :isBigCar, :boolean
  end
end
