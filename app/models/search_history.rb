class SearchHistory < ActiveRecord::Base

	def self.storeKey(keyword, userID)
		@rec = SearchHistory.create(:keyword => keyword, :user => userID)
	end

	def self.getHistory(userid)
		SearchHistory.where(:user => userid)
	end

end
