class AddAuthorToPicture < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :author, :string
    add_column :pictures, :website, :string
  end
end
