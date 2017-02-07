class AddListIdToCards < ActiveRecord::Migration[5.0]
  def change

    add_column :cards, :list_id, :integer
    add_index :cards, :list_id

  end
end
