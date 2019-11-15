class AddContentsToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :name, :string
    add_column :posts, :description, :text
  end
end
