Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :parking_spaces do
        collection do
          post :find_id
        end
      end
    end
  end
end