class BoardsController < ApplicationController

  def create
    @board = Board.new(whitelist)
    if @board.save
      respond_to do |format|
        format.json { render json: @board }
      end
    else
      respond_to do |format|
        format.json { render json: @board.errors.full_messages }
      end
    end
  end

  private

  def whitelist
    params.require(:board).permit(:title, :user_id)
  end

end
