class CreateParkingSpaces < ActiveRecord::Migration[7.0]
  def change
    create_table :parking_spaces do |t|
      t.string :user
      t.integer :index

      t.timestamps
    end
  end
end
