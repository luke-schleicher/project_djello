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
      #   .to_json(
      #   include: {
      #     lists: {
      #       include: :cards
      #     }
      #   }
      # ) }
    end
  end

  def destroy
    @board = Board.find_by(id: params[:id])
    if @board.destroy
      respond_to do |format|
        format.json { render json: { status: 200 }, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render json: { error: "Unable to delete.", status: :unprocessable_identity }, status: :unprocessable_identity }
      end
    end
  end

  def index
    @boards = Board.all.where(user_id: current_user.id)
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  private

    def whitelist
      params.require(:board).permit(:title, :user_id)
    end

end
