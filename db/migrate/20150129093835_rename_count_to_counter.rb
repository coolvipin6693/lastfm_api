class RenameCountToCounter < ActiveRecord::Migration
	def self.up
		rename_column :search_histories, :count, :counter
	end

	def self.down
		rename_column :search_histories, :counter, :count
	end
end
