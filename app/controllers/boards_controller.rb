class BoardsController < ApplicationController

  def create
    if @board.create(whitelist)
      respond_to do |format|
        format.json { render json: @board }
      end
    else
      respond_to do |format|
        format.json { render json: @board.errors.full_messages }
      end
    end
  end

end
