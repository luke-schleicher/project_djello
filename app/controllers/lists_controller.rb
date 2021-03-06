class ListsController < ApplicationController

  before_action :authenticate_user!

  def create
    @board = Board.find(params[:list][:board_id])
    @list = @board.lists.build(whitelisted_create)
    if @list.save
      respond_to do |format|
        format.json { render json: @list }
      end
    else
      respond_to do |format|
        format.json { render json: @list.errors.full_messages }
      end
    end
  end

  def update
    @board = Board.find(params[:list][:board_id])
    @list = @board.lists.find(params[:list][:id])
    if @list.update(whitelisted_update)
      respond_to do |format|
        format.json { render json: @list.to_json( include: :cards) }
      end
    else
      respond_to do |format|
        format.json { render json: @list.errors.full_messages }
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      respond_to do |format|
        format.json { render json: { status: "ok" } }
      end
    else
      respond_to do |format|
        format.json { render json: @list.errors.full_messages }
      end
    end
  end

  private

    def whitelisted_create
      params.require(:list).permit(:title, :description, :board_id)
    end

    def whitelisted_update
      params.require(:list).permit(:id, :title, :description, :board_id, :created_at, :updated_at)
    end
end
