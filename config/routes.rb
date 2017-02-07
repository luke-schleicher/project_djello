Rails.application.routes.draw do

  root 'static_pages#index'

  devise_for :users
  get 'static_pages/index'

  scope :api do
    scope :v1 do
      resources :boards
      resources :lists
      resources :cards
    end
  end

end
