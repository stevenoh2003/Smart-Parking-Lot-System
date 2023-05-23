class AddPasswordToParkingSpaces < ActiveRecord::Migration[7.0]
  def change
    add_column :parking_spaces, :password, :integer
  end
end
