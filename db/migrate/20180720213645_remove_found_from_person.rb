class RemoveFoundFromPerson < ActiveRecord::Migration[5.2]
  def change
    remove_column :people, :found, :boolean
  end
end
