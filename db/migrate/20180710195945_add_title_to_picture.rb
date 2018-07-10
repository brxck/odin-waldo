class AddTitleToPicture < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :title, :string
  end
end
