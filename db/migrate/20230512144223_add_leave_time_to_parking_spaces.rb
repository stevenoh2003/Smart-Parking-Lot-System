class AddLeaveTimeToParkingSpaces < ActiveRecord::Migration[7.0]
  def change
    add_column :parking_spaces, :leave_time, :datetime
  end
end
