class AddFoundToPerson < ActiveRecord::Migration[5.2]
  def change
    add_column :people, :found, :boolean
  end
end
