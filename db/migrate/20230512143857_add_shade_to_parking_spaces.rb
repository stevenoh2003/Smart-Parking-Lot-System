class AddShadeToParkingSpaces < ActiveRecord::Migration[7.0]
  def change
    add_column :parking_spaces, :hasShade, :boolean
  end
end
