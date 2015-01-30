class RemoveCounterFromSearchHistory < ActiveRecord::Migration
  def change
		remove_column :search_histories, :counter
  end
end
