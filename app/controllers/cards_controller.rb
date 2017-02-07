class CardsController < ApplicationController

  before_action :authenticate_user!

  def index
    @cards = Card.all_by_list_id(params[:list_id])
    respond_to do |format|
      format.json { render json: @cards }
    end
  end

  def create
    @list = List.find(params[:card][:list_id])
    @card = @list.cards.build(whitelisted_create)
    if @card.save
      respond_to do |format|
        format.json { render json: @card }
      end
    else
      respond_to do |format|
        format.json { render json: @card.errors.full_messages }
      end
    end
  end

  private

    def whitelisted_create
      params.require(:card).permit(:title, :description, :list_id)
    end

end
