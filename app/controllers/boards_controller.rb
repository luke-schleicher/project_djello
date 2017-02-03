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

  def show
    @board = Board.find_by(id: params[:id])
    respond_to do |format|
      format.json { render json: @board }
    end
  end

  def index

    # @boards = Board.all.where(current user)
  end

  private

    def whitelist
      params.require(:board).permit(:title, :user_id)
    end

end
