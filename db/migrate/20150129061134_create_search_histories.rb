class CreateSearchHistories < ActiveRecord::Migration
  def change
    create_table :search_histories do |t|
      t.integer :user
      t.string :keyword
      t.integer :count

      t.timestamps
    end
  end
end
