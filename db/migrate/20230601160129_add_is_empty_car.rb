class AddIsEmptyCar < ActiveRecord::Migration[7.0]
  def change
    add_column :parking_spaces, :isEmpty, :boolean

  end
end
