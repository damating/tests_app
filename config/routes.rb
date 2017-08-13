Rails.application.routes.draw do
  root to: 'home#index'

  resources :groups, only: [:index, :create, :destroy, :update]
  resources :tests, only: [:index, :create, :destroy, :update, :show] do
    member do
      get :to_solve
    end
  end

  # get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
