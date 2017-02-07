class BoardsController < ApplicationController

  before_action :authenticate_user!

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def show
    @board = Board.find_by(id: params[:id])
    respond_to do |format|
      format.json { render json: @board.to_json(include: :lists) }
    end
  end

  def create
    @board = Board.new(whitelist_create)
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

  def update
    @board = Board.find_by(id: params[:id])
    if @board.update(whitelist_update)
      respond_to do |format|
        format.json { render json: @board.to_json(include: :lists) }
      end
    else
      respond_to do |format|
        format.json { render json: @board.errors.full_messages }
      end
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


  private

    def whitelist_create
      params.require(:board).permit(:title, :user_id)
    end

    def whitelist_update
      params.require(:board).permit(:id, :title, :user_id, :created_at, :updated_at)
    end

end
