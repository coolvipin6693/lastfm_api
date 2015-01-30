class SearchHistoryController < ApplicationController

	def storeKeyword
		keyword = params[:keyword]
		userID = current_user.id
		SearchHistory.storeKey(keyword, userID)
		render 'pages/home'
	end

	def getSearchHistory
		@result =  SearchHistory.where(:user => current_user.id)
	end
end
